import { useNavigate } from "react-router-dom";
import { FormLogin as Form } from "../../components/FormLogin";
import styles from "./styles.module.css";

import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoginOutlined,
} from "@ant-design/icons";
import { Button, Input } from "antd";
import requests from "../../services/request";
import { useState } from "react";

export function Login() {
  const nav = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  function handleHomePage() {
    requests.Login(username, password).then(() => {
      nav("home");
    })
  }

  function handleNewAccountPage() {
    nav("newAccount");
  }

  return (
    <main id={styles.main}>
      <Form title="Login">
        <Input size="large" placeholder="Email" value={username} onChange={e => setUsername(e.target.value)} />
        <Input.Password
          size="large"
          placeholder="Password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          value={password}
          onChange={e => setPassword(e.target.value)}
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
