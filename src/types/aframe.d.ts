import type { DetailedHTMLProps, HTMLAttributes } from "react";

type AFrameElement = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  [key: string]: unknown;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "a-scene": AFrameElement;
      "a-marker": AFrameElement;
      "a-box": AFrameElement;
      "a-cylinder": AFrameElement;
      "a-text": AFrameElement;
      "a-entity": AFrameElement;
    }
  }
}

export {};
