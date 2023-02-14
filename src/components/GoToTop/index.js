import styles from "./GoToTop.module.css";

function GoToTop() {
  function goToTopHandler() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <button onClick={goToTopHandler} className={styles.btn} title="Go to top">
      <i className="fas fa-arrow-circle-up" style={{ fontSize: "30px" }}></i>
    </button>
  );
}

export default GoToTop;
