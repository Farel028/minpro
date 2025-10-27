import type { DetailedHTMLProps, HTMLAttributes } from "react";

type AFrameHTMLElement = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  [key: string]: unknown;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "a-scene": AFrameHTMLElement;
      "a-entity": AFrameHTMLElement;
      "a-camera": AFrameHTMLElement;
      "a-cylinder": AFrameHTMLElement;
      "a-sphere": AFrameHTMLElement;
      "a-text": AFrameHTMLElement;
    }
  }
}

export {};
