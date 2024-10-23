import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import HomePage from "./components/pages/HomePage/HomePage";
import Layout from "./components/Layouts/Layout";
import CatalogPage from "./components/pages/CatalogPage/CatalogPage";


function App() {
  return (
      <Routes>
          <Route path="/" element={<Layout />}>
              <Route
                  index
                  element={<HomePage />}
              />
          </Route>
          <Route path="/catalog" element={<Layout />}>
              <Route
                  index
                  element={<CatalogPage />}
              />
          </Route>
      </Routes>
  );
}

export default App;
