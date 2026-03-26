import { useNavigate } from "react-router-dom";
import useBasket from "../hooks/useBasket";
import { useEffect, useState } from "react";

export default function Order() {
  const { food } = useBasket();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    comment: "",
  });

  const totalItems = food.reduce((sum, item) => sum + item.count, 0);

  useEffect(() => {
    if (food.length === 0) {
      navigate("/");
    }
  }, [food, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const payload = {
      ...form,
      items: food,
    };

    console.log("ORDER:", payload);
  };

  return (
    <div className="grid grid-cols-3 gap-10">
      <div className="col-span-2 bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-6">Оформлення замовлення</h2>

        <div className="space-y-5">
          <div>
            <label className="text-sm text-gray-500">Ім’я</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ваше ім’я"
              className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Телефон</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+380..."
              className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Коментар</label>
            <textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
              placeholder="Додаткові побажання..."
              className="w-full mt-1 px-4 py-3 border rounded-xl h-28 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={food.length === 0}
            className={`w-full py-4 rounded-xl text-white font-semibold text-lg
              ${
                food.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
              }
            `}
          >
            Підтвердити замовлення
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow h-fit sticky top-24">
        <h3 className="text-xl font-semibold mb-4">Ваше замовлення</h3>

        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {food.map((item, idx) => (
            <div key={item.idMeal + idx} className="flex items-center gap-3">
              <img
                src={item.strMealThumb}
                className="w-14 h-14 rounded-lg object-cover"
              />

              <div className="flex-1">
                <p className="text-sm font-medium">{item.strMeal}</p>
                <p className="text-xs text-gray-400">{item.count} шт.</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t my-4" />

        <div className="flex justify-between text-sm text-gray-500">
          <span>Кількість позицій</span>
          <span>{totalItems}</span>
        </div>

        <div className="flex justify-between text-lg font-semibold mt-2">
          <span>Разом</span>
          <span>{totalItems * 100} грн</span>
        </div>
      </div>
    </div>
  );
}
