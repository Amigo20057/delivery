import { Outlet } from "react-router";
import Header from "../components/Header";
import Basket from "../components/Basket";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <Basket />

      <main className="max-w-7xl mx-auto px-4 py-25">
        <Outlet />
      </main>
    </div>
  );
}
