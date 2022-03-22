import { Routes, Route } from "react-router-dom";
import { Board } from "./pages/BoardPage";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import React, { useEffect } from "react";
import "antd/dist/antd.css";
import { NewBoard } from "./pages/NewBoard";
import { NewAccount } from "./pages/NewAccount";
import request from "./services/request";
import { NewNote } from "./pages/NewNote";

function App() {
  useEffect(() => {
    request.User();
  }, [])
  
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/home/*" element={<Home />}></Route>
      <Route path="board/*" element={<Board />}></Route>
      <Route path="/newBoard" exact element={<NewBoard />}></Route>
      <Route path="/newNote" exact element={<NewNote />}></Route>
      <Route path="/newAccount" exact element={<NewAccount />}></Route>
    </Routes>
  );
}

export default App;
