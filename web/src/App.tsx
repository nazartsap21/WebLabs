import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import HomePage from "./components/pages/HomePage/HomePage";
import Layout from "./components/Layouts/Layout";
import CatalogPage from "./components/pages/CatalogPage/CatalogPage";
import ItemPage from "./components/pages/ItemPage/ItemPage";
import CartPage from "./components/pages/CartPage/CartPage";
import CheckoutPage from "./components/pages/CheckoutPage/CheckoutPage";
import SuccessPage from "./components/pages/SuccessPage/SuccessPage";


function App() {
  return (
      <Routes>
          <Route path="/" element={<Layout />}>
              <Route
                  index
                  element={<HomePage />}
              />
              <Route path={'catalog'} element={<CatalogPage />} />
              <Route path={'catalog/:id'} element={<ItemPage/>} />
              <Route path={'cart'} element={<CartPage />} />
              <Route path={'checkout'} element={<CheckoutPage />} />
              <Route path={'success'} element={<SuccessPage />} />
          </Route>
      </Routes>
  );
}

export default App;
