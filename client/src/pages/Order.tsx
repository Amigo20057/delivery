import { useNavigate } from "react-router-dom";
import useBasket from "../hooks/useBasket";
import { useEffect, useState } from "react";
import api from "../api";
import TrackOrderModal from "../components/TrackOrderModal";

interface IOrder {
  name: string;
  phone: string;
  address: string;
  comment?: string;
}

interface IErrors {
  name?: string;
  phone?: string;
  address?: string;
}

export default function Order() {
  const { food, totalPrice, totalFood } = useBasket();
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [telegramLink, setTelegramLink] = useState("");
  const [loadingCreateOrder, setLoadingCreateOrder] = useState(false);
  const [form, setForm] = useState<IOrder>({
    name: "",
    phone: "",
    address: "",
    comment: "",
  });
  const [errors, setErrors] = useState<IErrors>({});

  useEffect(() => {
    if (food.length === 0) {
      navigate("/");
    }
  }, [food, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const validate = () => {
    const newErrors: IErrors = {};

    if (!form.name.trim()) newErrors.name = "Ім’я обов’язкове";
    if (!form.phone.trim()) {
      newErrors.phone = "Телефон обов’язковий";
    } else if (!/^\+380\d{9}$/.test(form.phone)) {
      newErrors.phone = "Телефон повинен починатися з +380 і містити 9 цифр";
    }
    if (!form.address.trim()) newErrors.address = "Адреса обов’язкова";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoadingCreateOrder(true);

      const payload = {
        ...form,
        items: food,
      };

      const response = await api("/orders", "POST", payload);

      setTelegramLink(response.telegramLink);
      setIsOpenModal(true);
    } catch (err) {
      console.error(err);
      alert("Помилка при створенні замовлення");
    } finally {
      setLoadingCreateOrder(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-2 bg-white p-8 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-6">Оформлення замовлення</h2>

          <div className="space-y-5">
            <div>
              <label className="text-sm text-gray-500">Ім’я</label>
              <input
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Ваше ім’я"
                className={`w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${
                  errors.name
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-orange-400"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-500">Телефон</label>
              <input
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                placeholder="+380..."
                className={`w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${
                  errors.phone
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-orange-400"
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-500">Адреса</label>
              <input
                name="address"
                required
                value={form.address}
                onChange={handleChange}
                placeholder="Місто. вул. буд."
                className={`w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${
                  errors.address
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-orange-400"
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
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
              disabled={food.length === 0 || loadingCreateOrder}
              className={`w-full py-4 rounded-xl text-white font-semibold text-lg
              ${
                food.length === 0 || loadingCreateOrder
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
              }
            `}
            >
              {loadingCreateOrder ? "Створення..." : "Підтвердити замовлення"}
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
            <span>{totalFood}</span>
          </div>

          <div className="flex justify-between text-lg font-semibold mt-2">
            <span>Разом</span>
            <span>{totalPrice} грн</span>
          </div>
        </div>
      </div>
      {isOpenModal && (
        <TrackOrderModal
          setIsOpenModal={setIsOpenModal}
          telegramLink={telegramLink}
        />
      )}
    </>
  );
}
