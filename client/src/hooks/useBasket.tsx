import { useContext } from "react";
import { BasketContext } from "../context/BasketContext";

export default function useBasket() {
  const basketContext = useContext(BasketContext);
  if (!basketContext)
    throw new Error("useBasket must be used within a BasketProvider");
  return basketContext;
}
