import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./Layouts/Layout";


function App() {
  return (
      <Routes>
          <Route path="/" element={<Layout />}>
              <Route
                  index
                  element={<HomePage />}
              />
          </Route>
      </Routes>
  );
}

export default App;
