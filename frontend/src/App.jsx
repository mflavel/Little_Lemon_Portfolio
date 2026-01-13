import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./Pages/Main.jsx";
import Footer from "./Pages/Footer.jsx";
import Nav from "./Pages/Nav.jsx";
import Menu from './Pages/Menu'; // adjust the path if your file is somewhere else
import MenuItem from './Pages/Menu-Item.jsx';
import Login from './Pages/Login.jsx';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu-item" element={<MenuItem />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;
