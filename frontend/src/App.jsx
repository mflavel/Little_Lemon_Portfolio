import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./Pages/Main.jsx";
import Footer from "./Pages/Footer.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;
