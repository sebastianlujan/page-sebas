import type { CSSProperties } from "react";

// Returns an inline style that sets the `--d` animation delay for a `.reveal`
// element, producing a staggered entrance cascade (see globals.css).
export function stagger(index: number, step = 90): CSSProperties {
  return { "--d": `${index * step}ms` } as CSSProperties;
}
