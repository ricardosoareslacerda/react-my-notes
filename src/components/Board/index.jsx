import { Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

export function Board(props) {
  const nav = useNavigate();
  function handleBoardPage() {
    nav(`/board/${name}`);
  }

  const { name } = props;
  return (
    <button id={styles.button} onClick={handleBoardPage}>
      <Card style={{ width: 300 }}>
        <h3>{name}</h3>
      </Card>
    </button>
  );
}
