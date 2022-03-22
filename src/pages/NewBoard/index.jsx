import { useNavigate } from "react-router-dom";
import { FormLogin as Form } from "../../components/FormLogin";
import styles from "./styles.module.css";

import { FileAddOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { ButtonBack } from "../../components/ButtonBack";
import request from "../../services/request";
import { useState } from "react";

export function NewBoard() {
  const [name, setName] = useState('');
  const nav = useNavigate();

  function handleHomePage() {
    request.NewBoard({
      name
    }).then(() => {
      nav("/home");
    })
  }

  return (
    <main id={styles.main}>
      <ButtonBack nav="/home"></ButtonBack>
      <Form title="Board">
        <Input size="large" placeholder="Title ex: Board One" value={name} onChange={e => setName(e.target.value)} />
        <Button
          icon={<FileAddOutlined />}
          type="primary"
          onClick={handleHomePage}
        >
          Create
        </Button>
      </Form>
    </main>
  );
}
