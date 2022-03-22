import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FormLogin as Form } from "../../components/FormLogin";
import styles from "./styles.module.css";

import { FileAddOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
const { TextArea } = Input;
import { ButtonBack } from "../../components/ButtonBack";
import request from "../../services/request";
import { useState } from "react";

export function NewNote(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const nav = useNavigate();
  const { state } = useLocation();

  function handleNewNote() {
    request.NewNote({
      name,
      description,
      board: state.board.id,
    }).then(() => {
      nav("/board/" + state.board.id);
    })
  }

  return (
    <main id={styles.main}>
      <ButtonBack nav={"/board/" + state.board.id}></ButtonBack>
      <Form title="New Note">
        <Input size="large" placeholder="Title ex: Note One" value={name} onChange={e => setName(e.target.value)} />
        <TextArea rows={4} placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <Button
          icon={<FileAddOutlined />}
          type="primary"
          onClick={handleNewNote}
        >
          Create
        </Button>
      </Form>
    </main>
  );
}
