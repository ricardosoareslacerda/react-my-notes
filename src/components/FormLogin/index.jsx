import styles from "./styles.module.css";

export function FormLogin(props) {
  const { children } = props;

  return <form className={styles.form}>{children}</form>;
}
