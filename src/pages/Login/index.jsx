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

  function handleNewAccountPage() {
    nav("newAccount");
  }

  return (
    <main id={styles.main}>
      <Form title="Login">
        <Input size="large" placeholder="Email" />
        <Input.Password
          size="large"
          placeholder="Password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
        <Button type="primary" onClick={handleHomePage}>
          Login
        </Button>

        <p>
          Need an account?
          <Button type="link" onClick={handleNewAccountPage}>
            Sign up
          </Button>
        </p>
      </Form>
    </main>
  );
}
