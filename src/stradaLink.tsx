import { useCallback, useEffect, useState } from "react";
import useScript from "react-script-hook";
import { StradaLinkProps, StradaLinkResponse } from "./types";

export const useStradaLink = (config: StradaLinkProps): StradaLinkResponse => {
  const [loading, error] = useScript({
    src: "/Users/arashkhazaei/Dev/Strada/strada-app/link/link-asset/initialize.js",
    checkForExisting: true,
  });
  const [isReady, setIsReady] = useState(false);
  const isServer = typeof window === "undefined";
  const isReadyForInitialization =
    !isServer &&
    !!window.StradaLink &&
    !loading &&
    !error &&
    config.linkToken !== undefined;

  useEffect(() => {
    if (isReadyForInitialization && window.StradaLink) {
      window.StradaLink.initialize({
        linkToken: config.linkToken,
        onReady: () => setIsReady(true),
      });
    }
  }, [isReadyForInitialization, config]);

  const open = useCallback(() => {
    if (window.StradaLink) {
      window.StradaLink.openLink(config);
    }
  }, [config]);

  return { open, isReady, error };
};
