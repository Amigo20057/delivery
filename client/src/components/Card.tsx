import { ShoppingCart } from "lucide-react";
import type { IFood } from "../types/food";
import useBasket from "../hooks/useBasket";
import { motion } from "framer-motion";
import { useState } from "react";
import LazyImage from "./LazyImage";

interface IProps {
  food: IFood;
}

export default function Card({ food }: IProps) {
  const { addFood } = useBasket();
  const [animate, setAnimate] = useState(false);

  const handleAdd = () => {
    setAnimate(true);

    setTimeout(() => {
      addFood(food);
      setAnimate(false);
    }, 600);
  };

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition relative">
      {animate && (
        <motion.img
          src={food.strMealThumb}
          className="absolute w-20 h-20 object-cover rounded-lg z-50"
          initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
          animate={{
            x: 300,
            y: -300,
            scale: 0.3,
            opacity: 0,
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      )}

      <LazyImage
        src={food.strMealThumb}
        alt={food.strMeal}
        className="w-full h-40 object-cover"
      />

      <div className="flex items-center justify-between pr-4">
        <div className="p-4">
          <h3 className="font-semibold text-lg">{food.strMeal}</h3>
          <p className="text-gray-500 text-sm">{food.strCategory}</p>
          <p className="text-gray-400 text-xs">{food.strArea}</p>
        </div>

        <ShoppingCart className="cursor-pointer" onClick={handleAdd} />
      </div>
    </div>
  );
}
