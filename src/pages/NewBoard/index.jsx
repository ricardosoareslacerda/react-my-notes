import { useNavigate } from "react-router-dom";
import { FormLogin as Form } from "../../components/FormLogin";
import styles from "./styles.module.css";

import { FileAddOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";

export function NewBoard() {
  const nav = useNavigate();

  function handleHomePage() {
    nav("/home");
  }

  return (
    <main id={styles.main}>
      <Form title="Board">
        <Input size="large" placeholder="Title ex: Board One" />
        <Button type="primary" onClick={handleHomePage}>
          Create
          <FileAddOutlined />
        </Button>
      </Form>
    </main>
  );
}
