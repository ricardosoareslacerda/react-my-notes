import { Button, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { Board } from "../../components/Board";
import styles from "./styles.module.css";
import { LogoutOutlined, FileAddFilled, UserOutlined } from "@ant-design/icons";

export function Home() {
  const nav = useNavigate();

  function handleLoginPage() {
    nav("/");
  }

  function handleOnClick() {}

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
            user.name
          </h1>
          <h3>user.email</h3>
        </div>
      </header>

      <div id={styles.buttons}>
        <Tooltip title="New Board">
          <Button
            type="primary"
            shape="circle"
            icon={<FileAddFilled />}
            size="large"
            onClick={handleOnClick}
          />
        </Tooltip>
      </div>

      <main id={styles.board_list}>
        <Board name="Board 1" />
        <Board name="Board 2" />
        <Board name="Board 3" />
        <Board name="Board 4" />
        <Board name="Board 5" />
      </main>
    </div>
  );
}
