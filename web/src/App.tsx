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
import LoginPage from "./components/pages/LoginPage/LoginPage";
import RegisterPage from "./components/pages/RegisterPage/RegisterPage";
import ProtectedRoute from "./components/entities/ProtectedRoute/ProtectedRoute";


function App() {
  return (
      <Routes>
          <Route path="/" element={<Layout />}>
              <Route
                  index
                  element={<ProtectedRoute><HomePage /></ProtectedRoute>}
              />
              <Route
                  path={'catalog'}
                  element={<ProtectedRoute><CatalogPage /></ProtectedRoute>}
              />
              <Route
                  path={'catalog/:id'}
                  element={<ProtectedRoute><ItemPage/></ProtectedRoute>}
              />
              <Route
                  path={'cart'}
                  element={<ProtectedRoute><CartPage /></ProtectedRoute>}
              />
              <Route
                  path={'checkout'}
                  element={<CheckoutPage />}
              />
              <Route
                  path={'success'}
                  element={<ProtectedRoute><SuccessPage /></ProtectedRoute>}
              />
              <Route path={'login'} element={<LoginPage />} />
              <Route path={'register'} element={<RegisterPage />} />
          </Route>
      </Routes>
  );
}

export default App;
