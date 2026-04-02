import { X, CheckCircle, Send } from "lucide-react";

interface IProps {
  setIsOpenModal: (val: boolean) => void;
  telegramLink: string;
}

export default function TrackOrderModal({
  setIsOpenModal,
  telegramLink,
}: IProps) {
  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={() => setIsOpenModal(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
      />

      {/* MODAL */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 relative animate-[fadeIn_.3s_ease]">
          {/* CLOSE */}
          <button
            onClick={() => setIsOpenModal(false)}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={20} />
          </button>

          {/* ICON */}
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle size={40} className="text-green-500" />
            </div>
          </div>

          {/* TITLE */}
          <h2 className="text-2xl font-bold text-center mb-2">
            Замовлення оформлено 🎉
          </h2>

          {/* TEXT */}
          <p className="text-gray-500 text-center mb-6">
            Ваше замовлення успішно створено.
            <br />
            Ви можете відстежувати його статус у Telegram.
          </p>

          {/* TELEGRAM BUTTON */}
          <a
            href={telegramLink}
            target="_blank"
            className="flex items-center justify-center gap-2 w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition"
          >
            <Send size={18} />
            Відстежити в Telegram
          </a>

          {/* SECONDARY BUTTON */}
          <button
            onClick={() => setIsOpenModal(false)}
            className="w-full mt-3 py-3 rounded-xl border font-semibold hover:bg-gray-50"
          >
            Закрити
          </button>
        </div>
      </div>
    </>
  );
}
