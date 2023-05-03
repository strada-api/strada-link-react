export enum StradaEnvironment {
  Sandbox = "sandbox",
  Prod = "prod",
  Local = "local",
}

export interface StradaLink {
  initialize: (config: StradaLinkProps) => void;
  openLink: (config: StradaLinkProps) => void;
}

export interface StradaLinkProps {
  env: string;
  linkAccessToken: string;
  onReady?: () => void;
  onSuccess: (publicConnectionToken: string) => void;
  onExit?: () => void;
}

export type StradaLinkResponse = {
  open: () => void;
  isReady: boolean;
  error: ErrorEvent | null;
};

declare global {
  interface Window {
    StradaLink: StradaLink;
  }
}
