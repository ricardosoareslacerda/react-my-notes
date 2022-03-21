import { useNavigate } from "react-router-dom";
import { FormLogin as Form } from "../../components/FormLogin";
import styles from "./styles.module.css";

import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoginOutlined,
} from "@ant-design/icons";
import { Button, Input } from "antd";

export function Login() {
  const nav = useNavigate();

  function handleHomePage() {
    nav("home");
  }

  return (
    <main id={styles.main}>
      <Form>
        <Input size="large" placeholder="Email" />
        <Input.Password
          size="large"
          placeholder="Senha"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
        <Button type="primary" onClick={handleHomePage}>
          Entrar
        </Button>
      </Form>
    </main>
  );
}
