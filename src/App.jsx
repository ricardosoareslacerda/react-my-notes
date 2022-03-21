import { Routes, Route } from "react-router-dom";
import { Board } from "./pages/BoardPage";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import React from "react";
import "antd/dist/antd.css";
import { NewBoard } from "./pages/NewBoard";
import { NewAccount } from "./pages/NewAccount";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/home/*" element={<Home />}></Route>
      <Route path="board/*" element={<Board />}></Route>
      <Route path="/newBoard" exact element={<NewBoard />}></Route>
      <Route path="/newAccount" exact element={<NewAccount />}></Route>
    </Routes>
  );
}

export default App;
