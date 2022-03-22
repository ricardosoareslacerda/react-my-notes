import { Button, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { Board } from "../../components/Board";
import styles from "./styles.module.css";
import { LogoutOutlined, FileAddFilled, UserOutlined } from "@ant-design/icons";
import request from "../../services/request";
import { useEffect, useState } from "react";

export function Home() {
  const nav = useNavigate();
  const [boards, setBoards] = useState([]);
  const [user, setUser] = useState(request.User());
  useEffect(() => {
    getBoards()
  }, [])
  

  function handleLoginPage() {
    nav("/");
  }

  function handleNewBoardPage() {
    nav("/newBoard");
  }

  function getBoards() {
    request.Boards().then(({data}) => {
      setBoards(data)
    })
  }


  return (
    <div id={styles.home}>
      <header id={styles.header}>
        <Tooltip title="Logout">
          <Button
            type="danger"
            icon={<LogoutOutlined />}
            size="large"
            onClick={handleLoginPage}
          ></Button>
        </Tooltip>
        <div id={styles.user_section}>
          <h1>
            <UserOutlined />
            {user.user.name}
          </h1>
          <h3>{user.user.email}</h3>
        </div>
      </header>

      <div id={styles.buttons}>
        <Tooltip title="New Board">
          <Button
            type="primary"
            shape="circle"
            icon={<FileAddFilled />}
            size="large"
            onClick={handleNewBoardPage}
          />
        </Tooltip>
      </div>

      <main id={styles.board_list}>
        {boards.map((board) => <Board board={board} key={board.id} />)}
      </main>
    </div>
  );
}
