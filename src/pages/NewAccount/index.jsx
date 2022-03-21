import { useNavigate } from "react-router-dom";
import { FormLogin as Form } from "../../components/FormLogin";
import styles from "./styles.module.css";

import { UserAddOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { ButtonBack } from "../../components/ButtonBack";

export function NewAccount() {
  const nav = useNavigate();

  function handleLoginPage() {
    nav("/");
  }

  return (
    <main id={styles.main}>
      <ButtonBack nav="/"></ButtonBack>
      <Form title="Account">
        <Input size="large" placeholder="Name" />
        <Input size="large" placeholder="Email" />
        <Input size="large" placeholder="Password" />
        <Button
          icon={<UserAddOutlined />}
          type="primary"
          onClick={handleLoginPage}
        >
          Create
        </Button>
      </Form>
    </main>
  );
}
