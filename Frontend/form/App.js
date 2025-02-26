import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./layout";
import Calendar from "./calendar";
import Products from "./products";
import FullForm from "./dashbord";
import Suppliers from "./Suppliers";
import Reports from "./Reports"


const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<FullForm />} />
          <Route path="/products" element={<Products />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
