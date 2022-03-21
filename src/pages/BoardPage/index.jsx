import { useParams } from "react-router-dom";
import styles from "./styles.module.css";

export function Board() {
  const params = useParams();
  const currentBoard = params["*"];
  return (
    <>
      <h1 id={styles.title}>{currentBoard}</h1>
    </>
  );
}
