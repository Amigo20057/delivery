import { useNavigate } from "react-router-dom";
import useBasket from "../hooks/useBasket";
import { X, Trash2, ShoppingBag } from "lucide-react";

export default function Basket() {
  const {
    food,
    isOpenBasket,
    handleChangeOpenBasket,
    removeFood,
    increaseFood,
    decreaseFood,
  } = useBasket();
  const navigate = useNavigate();

  const handleGoToCreateOrder = () => {
    handleChangeOpenBasket();
    navigate("/order");
  };

  return (
    <>
      <div
        onClick={handleChangeOpenBasket}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-all duration-300 z-40
        ${isOpenBasket ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      <div
        className={`fixed top-0 right-0 h-full w-105 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.25)] z-50
        transform transition-transform duration-300 ease-out flex flex-col
        ${isOpenBasket ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b bg-white/80 backdrop-blur">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-orange-500" />
            <h2 className="text-xl font-semibold">Ваш кошик</h2>
            <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
              {food.reduce((sum, item) => sum + item.count, 0)}
            </span>
          </div>

          <button
            onClick={handleChangeOpenBasket}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {food.length === 0 && (
            <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
              <ShoppingBag size={40} className="mb-3 opacity-60" />
              Кошик пустий
            </div>
          )}

          {food.map((item, idx) => (
            <div
              key={item.idMeal + idx}
              className="flex items-center gap-4 bg-white border border-gray-100 shadow-sm p-3 rounded-xl hover:shadow-md transition"
            >
              <img
                src={item.strMealThumb}
                alt={item.strMeal}
                className="w-16 h-16 rounded-lg object-cover"
              />

              <div className="flex-1">
                <p className="text-sm font-semibold">{item.strMeal}</p>
                <p className="text-xs text-gray-400">{item.strCategory}</p>
                <p className="text-xs text-gray-300">{item.strArea}</p>
                <p>{item.price * item.count} ₴</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseFood(item.idMeal)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  -
                </button>

                <span className="min-w-[20px] text-center font-semibold">
                  {item.count}
                </span>

                <button
                  onClick={() => increaseFood(item.idMeal)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFood(item.idMeal)}
                className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <div className="border-t px-6 py-5 bg-white">
          <button
            onClick={handleGoToCreateOrder}
            disabled={food.length === 0}
            className={`w-full bg-linear-to-r  text-white font-semibold py-3 rounded-xl shadow-lg
            ${food.length === 0 ? "bg-gray-400 cursor-not-allowed" : "from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition"}
            `}
          >
            Замовити
          </button>
        </div>
      </div>
    </>
  );
}
