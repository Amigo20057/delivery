import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout.tsx";
import Home from "./pages/Home.tsx";
import { BasketProvider } from "./context/BasketContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <BasketProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BasketProvider>
  </BrowserRouter>,
);
