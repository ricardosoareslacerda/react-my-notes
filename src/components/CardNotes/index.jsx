import styles from "./styles.module.css";

export function CardNotes(props) {
  const { title, children } = props;
  return (
    <div className={styles.card}>
      <h2>{title}</h2>
      <hr />
      <p>{children}</p>
    </div>
  );
}
