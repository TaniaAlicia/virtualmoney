declare module "react-credit-cards-2" {
  import * as React from "react";
  export type Focused = "number" | "name" | "expiry" | "cvc";
  const Cards: React.ComponentType<{
    number?: string;
    name?: string;
    expiry?: string;
    cvc?: string;
    focused?: Focused;
    placeholders?: { name?: string };
    locale?: { valid?: string };
    issuer?: string;
    preview?: boolean;
  }>;
  export default Cards;
}
