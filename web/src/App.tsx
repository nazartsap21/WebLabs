import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import HomePage from "./components/pages/HomePage/HomePage";
import Layout from "./components/Layouts/Layout";
import CatalogPage from "./components/pages/CatalogPage/CatalogPage";
import ItemPage from "./components/pages/ItemPage/ItemPage";
import CartPage from "./components/pages/CartPage/CartPage";


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
          </Route>
      </Routes>
  );
}

export default App;
