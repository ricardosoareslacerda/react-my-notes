import { Button, Tooltip } from "antd";
import { useParams } from "react-router-dom";
import { CardNotes as Card } from "../../components/CardNotes";
import styles from "./styles.module.css";
import { AppstoreAddOutlined, LeftOutlined } from "@ant-design/icons";
import { ButtonBack } from "../../components/ButtonBack";

export function Board() {
  const params = useParams();
  const currentBoard = params["*"];

  return (
    <>
      <header>
        <ButtonBack nav="/home"></ButtonBack>
        <h1 id={styles.title}>{currentBoard}</h1>
      </header>
      <main id={styles.card_list}>
        <Card title="Note One">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
          blandit, quam interdum iaculis faucibus, libero diam facilisis massa,
          ut molestie ligula neque at tellus.
        </Card>

        <Button
          type="dashed"
          id={styles.new_note}
          icon={<AppstoreAddOutlined />}
        >
          New Notes
        </Button>
      </main>
    </>
  );
}
