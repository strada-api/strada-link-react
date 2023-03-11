export type ValidationErrors = ValidationError[];

export type ValidationError = {
  detail: string;
  problem_type?: string;
  [key: string]: any;
};

export interface StradaLink {
  initialize: (config: InitializeProps) => void;
  openLink: (config: StradaLinkProps) => void;
}

export interface StradaLinkProps {
  linkToken: string;
  onSuccess: (publicToken: string) => void;
  onValidationError?: (errors: ValidationErrors) => void;
  onExit?: () => void;
}

export interface InitializeProps {
  linkToken: string;
  onReady?: () => void;
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
