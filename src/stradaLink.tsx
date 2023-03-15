import { useCallback, useEffect, useState } from "react";
import useScript from "react-script-hook";
import { StradaLinkProps, StradaLinkResponse } from "./types";

export const useStradaLink = (config: StradaLinkProps): StradaLinkResponse => {
  const [loading, error] = useScript({
    src: "https://getstrada.com/link-asset/initialize.js",
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

  console.log("isReadyForInitialization", isReadyForInitialization);
  console.log(config);
  console.log("Loading had error", error);

  useEffect(() => {
    if (isReadyForInitialization && window.StradaLink) {
      window.StradaLink.initialize({
        env: config.env,
        linkAccessToken: config.linkAccessToken,
        onSuccess: config.onSuccess,
        onReady: () => setIsReady(true),
      });
      console.log("StradaLink ready");
    } else {
      console.log("StradaLink not ready");
    }
  }, [isReadyForInitialization, config]);

  const open = useCallback(() => {
    if (window.StradaLink) {
      console.log("Opening StradaLink");
      window.StradaLink.openLink(config);
    }
  }, [config]);

  console.log("Returning from useStradaLink", { open, isReady, error });
  return { open, isReady, error };
};
