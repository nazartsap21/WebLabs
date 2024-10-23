import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import HomePage from "./components/pages/HomePage/HomePage";
import Layout from "./components/Layouts/Layout";
import CatalogPage from "./components/pages/CatalogPage/CatalogPage";
import {RemindersProvider} from "./components/context/RemindersContext";


function App() {
  return (
      <RemindersProvider>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route
                      index
                      element={<HomePage />}
                  />
                  <Route path={'catalog'} element={<CatalogPage />} />
              </Route>
          </Routes>
      </RemindersProvider>
  );
}

export default App;
