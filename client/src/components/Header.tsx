import { ShoppingBasket } from "lucide-react";
import useBasket from "../hooks/useBasket";

export default function Header() {
  const { totalFood, handleChangeOpenBasket } = useBasket();

  return (
    <header className="w-full bg-white fixed top-0 left-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="text-2xl font-bold text-orange-500 cursor-pointer">
          FoodExpress
        </div>

        <button
          id="basket-button"
          className="relative bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center justify-center"
          onClick={handleChangeOpenBasket}
        >
          <ShoppingBasket />

          {totalFood > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {totalFood}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
