import styles from "./styles.module.css";

export function FormLogin(props) {
  const { children, title } = props;

  return (
    <form className={styles.form}>
      <h1>{title}</h1>
      {children}
    </form>
  );
}
