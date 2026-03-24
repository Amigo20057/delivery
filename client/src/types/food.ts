export interface IFood {
  idMeal: number;
  strMealThumb: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  count: number;
}
export type FoodCategories =
  | "All"
  | "Dessert"
  | "Vegetarian"
  | "Chicken"
  | "Beef"
  | "Miscellaneous"
  | "Seafood"
  | "Side";
