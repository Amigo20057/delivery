import {
  createContext,
  useState,
  type FC,
  type PropsWithChildren,
} from "react";
import type { IFood } from "../types/food";

type BasketContextType = {
  food: IFood[];
  totalFood: number;
  addFood: (food: IFood) => void;
  removeFood: (id: number) => void;
  isOpenBasket: boolean;
  handleChangeOpenBasket: () => void;
  increaseFood: (id: number) => void;
  decreaseFood: (id: number) => void;
};

export const BasketContext = createContext<BasketContextType | null>(null);

export const BasketProvider: FC<PropsWithChildren> = ({ children }) => {
  const [food, setFood] = useState<IFood[]>([]);
  const [isOpenBasket, setIsOpenBasket] = useState<boolean>(false);

  const totalFood = food.reduce((sum, item) => sum + item.count, 0);

  const addFood = (newFood: IFood) => {
    setFood((prev) => {
      const existing = prev.find((item) => item.idMeal === newFood.idMeal);

      if (existing) {
        return prev.map((item) =>
          item.idMeal === newFood.idMeal
            ? { ...item, count: item.count + 1 }
            : item,
        );
      }

      return [...prev, { ...newFood, count: 1 }];
    });
  };

  const removeFood = (id: number) => {
    setFood((prev) => prev.filter((item) => item.idMeal !== id));
  };

  const increaseFood = (id: number) => {
    setFood((prev) =>
      prev.map((item) =>
        item.idMeal === id ? { ...item, count: item.count + 1 } : item,
      ),
    );
  };

  const decreaseFood = (id: number) => {
    setFood((prev) =>
      prev
        .map((item) =>
          item.idMeal === id ? { ...item, count: item.count - 1 } : item,
        )
        .filter((item) => item.count > 0),
    );
  };

  const handleChangeOpenBasket = () => {
    setIsOpenBasket((prev) => !prev);
  };

  return (
    <BasketContext.Provider
      value={{
        food,
        totalFood,
        addFood,
        removeFood,
        isOpenBasket,
        handleChangeOpenBasket,
        increaseFood,
        decreaseFood,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};
