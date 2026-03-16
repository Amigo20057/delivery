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
};

export const BasketContext = createContext<BasketContextType | null>(null);

export const BasketProvider: FC<PropsWithChildren> = ({ children }) => {
  const [food, setFood] = useState<IFood[]>([]);
  const [isOpenBasket, setIsOpenBasket] = useState<boolean>(false);

  const totalFood = food.length;

  const addFood = (newFood: IFood) => {
    setFood([...food, newFood]);
  };

  const removeFood = (id: number) => {
    setFood(food.filter((food) => food.idMeal !== id));
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
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};
