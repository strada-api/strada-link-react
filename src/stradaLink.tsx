import { useCallback, useEffect, useState } from "react";
import useScript from "react-script-hook";
import { StradaEnviorment, StradaLinkProps, StradaLinkResponse } from "./types";

export const useStradaLink = (config: StradaLinkProps): StradaLinkResponse => {
  const [loading, error] = useScript({
    src:
      config.env === StradaEnviorment.Local
        ? "http://localhost:3333/link-asset/initialize.js"
        : "https://cdn.getstrada.com/link-asset/initialize.js",
    checkForExisting: true,
  });
  const [isReady, setIsReady] = useState(false);
  const isServer = typeof window === "undefined";
  const isReadyForInitialization =
    !isServer &&
    !!window.StradaLink &&
    !loading &&
    !error &&
    config.linkAccessToken !== undefined;

  useEffect(() => {
    if (isReadyForInitialization && window.StradaLink) {
      window.StradaLink.initialize({
        env: config.env,
        linkAccessToken: config.linkAccessToken,
        onSuccess: config.onSuccess,
        onReady: () => setIsReady(true),
      });
    } else {
      console.log("StradaLink not ready");
    }
  }, [isReadyForInitialization, config]);

  const open = useCallback(() => {
    if (window.StradaLink) {
      window.StradaLink.openLink(config);
    }
  }, [config]);

  return { open, isReady, error };
};
