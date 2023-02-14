import { Link } from "react-router-dom";
import styles from "./RoundedButton.module.css";

function RoundedButton({ to, children, ...other }) {
  let classes = styles.btn;

  if (other.className) {
    classes += " " + other.className;
  }

  let Component = "button";
  if (to) {
    Component = Link;
  }
  return (
    <Component to={to} {...other} className={classes}>
      {children}
    </Component>
  );
}

export default RoundedButton;
