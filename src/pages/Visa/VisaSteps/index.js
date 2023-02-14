import { steps } from "../mock";
import styles from "./VisaSteps.module.css";

function VisaSteps() {
  return (
    <div className={styles.container}>
      <div className={styles.steps}>
        <h5 className="pb-4">Các bước làm Visa tại YOJA</h5>

        <ul>
          {steps.map((item) => (
            <li key={item.num}>
              <p className={styles.num}>{item.num}</p>

              <p className={styles.name}>{item.name}</p>

              <p className={styles.desc}>{item.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default VisaSteps;
