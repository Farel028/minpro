import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "a-scene": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      "a-entity": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      "a-marker": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      "a-box": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      "a-cylinder": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      "a-text": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export {};
