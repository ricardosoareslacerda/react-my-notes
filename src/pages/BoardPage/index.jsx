import { Button, Tooltip } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { CardNotes as Card } from "../../components/CardNotes";
import styles from "./styles.module.css";
import { AppstoreAddOutlined, LeftOutlined } from "@ant-design/icons";
import { ButtonBack } from "../../components/ButtonBack";
import { useEffect, useState } from "react";
import request from "../../services/request";

export function Board() {
  const nav = useNavigate();
  const params = useParams();
  const currentBoard = params["*"];
  const [notes, setNotes] = useState([])
  const [board, setBoard] = useState(null)
  useEffect(() => {
    request.Notes(currentBoard).then(({data}) => {
      setNotes(data)
    })
    request.Board(currentBoard).then(({data}) => {
      setBoard(data)
    })
  }, [])

  function handleNewNotePage() {
    nav(`/newNote`, {
      state: {
        board: board,
      }
    });
  }
  
  return (
    <>
      <header>
        <ButtonBack nav="/home"></ButtonBack>
        <h1 id={styles.title}>{board?.name}</h1>
      </header>
      <main id={styles.card_list}>
        {
          notes.map((note) => 
            <Card title={note.name} key={note.id}>
              {note.description}
            </Card>
          )
        }

        <Button
          type="dashed"
          id={styles.new_note}
          icon={<AppstoreAddOutlined />}
          onClick={handleNewNotePage}
        >
          New Notes
        </Button>
      </main>
    </>
  );
}
