import { Routes, Route } from "react-router-dom";
import { Board } from "./pages/BoardPage";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import React from "react";
import "antd/dist/antd.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/home/*" element={<Home />}></Route>
      <Route path="/board/*" element={<Board />}></Route>
    </Routes>
  );
}

export default App;
