import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./Pages/Main.jsx";
import Footer from "./Pages/Footer.jsx";
import Nav from "./Pages/Nav.jsx";
import Menu from './Pages/Menu'; // adjust the path if your file is somewhere else
import MenuItem from './Pages/Menu-Item.jsx';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu-item" element={<MenuItem />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;
