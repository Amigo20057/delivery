import { useEffect, useState, type JSX } from "react";
import Card from "../components/Card";
import type { FoodCategories, IFood } from "../types/food";
import { X } from "lucide-react";
import { usePreloadImages } from "../hooks/usePreloadImages";
import { Beef, Egg, IceCream, Fish, Framer, Box } from "lucide-react";

function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow p-4 animate-pulse">
      <div className="w-full h-40 bg-gray-300 rounded-md mb-4"></div>
      <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
      <div className="h-3 bg-gray-300 rounded mb-1 w-1/2"></div>
      <div className="h-3 bg-gray-300 rounded w-1/3"></div>
    </div>
  );
}

export default function Home() {
  const [foods, setFoods] = useState<IFood[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] =
    useState<FoodCategories | null>(null);
  const imageUrls = foods.map((f) => f.strMealThumb);
  const imagesLoaded = usePreloadImages(imageUrls);

  const categories: {
    name: string;
    category: FoodCategories;
    icon: JSX.Element;
  }[] = [
    { name: "Яловичина", category: "Beef", icon: <Beef size={20} /> },
    { name: "Курка", category: "Chicken", icon: <Egg size={20} /> },
    { name: "Десерт", category: "Dessert", icon: <IceCream size={20} /> },
    { name: "Морепродукти", category: "Seafood", icon: <Fish size={20} /> },
    { name: "Гарнір", category: "Side", icon: <Framer size={20} /> },
    { name: "Різне", category: "Miscellaneous", icon: <Box size={20} /> },
  ];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((res) => res.json())
      .then((data) => setFoods(data.meals || []))
      .finally(() => setLoading(false));
  }, []);

  const handleCategoryClick = (category: FoodCategories) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const handleClearCategory = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCategory(null);
  };

  const filteredFoods = selectedCategory
    ? foods.filter((f: IFood) => f.strCategory === selectedCategory)
    : foods;

  return (
    <div>
      <section className="bg-orange-500 text-white rounded-2xl p-10 mb-10">
        <h1 className="text-4xl font-bold mb-4">Швидка доставка їжі</h1>
        <p className="mb-6">Замовляй улюблену їжу з ресторанів поруч</p>

        <div className="flex gap-3">
          <input
            placeholder="Введіть назву..."
            className="px-4 py-3 rounded-lg w-80 text-white placeholder-white"
          />
          <button className="bg-black px-6 py-3 rounded-lg cursor-pointer">
            Знайти
          </button>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Категорії</h2>
        <div className="flex gap-4 items-center">
          {categories.map((c) => (
            <div
              key={c.name}
              onClick={() => handleCategoryClick(c.category)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl shadow cursor-pointer transition
              ${selectedCategory === c.category ? "bg-gray-200 hover:bg-gray-300" : "bg-white hover:shadow-md"}`}
            >
              {c.icon}
              <span>{c.name}</span>
              {selectedCategory === c.category && (
                <X
                  size={16}
                  className="text-gray-600 cursor-pointer"
                  onClick={handleClearCategory}
                />
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">
          {selectedCategory
            ? `Популярні ${selectedCategory}`
            : "Популярні ресторани"}
        </h2>

        <div className="grid grid-cols-3 gap-6">
          {loading || !imagesLoaded
            ? Array.from({ length: 6 }).map((_, idx) => (
                <CardSkeleton key={idx} />
              ))
            : filteredFoods.map((food: IFood) => (
                <Card key={food.idMeal} food={food} />
              ))}
        </div>
      </section>
    </div>
  );
}
