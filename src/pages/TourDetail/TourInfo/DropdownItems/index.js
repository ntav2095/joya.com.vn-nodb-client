import styles from "./Tabs.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { chevronDown } from "../../../../assets/svgs";
import QuillReader from "../QuillReader";

function Tabs({ data }) {
  const [show, setShow] = useState([]);

  const toggleHandler = (id) => {
    setShow((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isActive = (id) => show.includes(id);

  return (
    <>
      {data.map((item) => (
        <div
          className={
            isActive(item.id)
              ? styles.tabItem + " " + styles.active
              : styles.tabItem
          }
          key={item.id}
        >
          <div
            className={styles.header}
            onClick={(e) => toggleHandler(item.id, e)}
          >
            <h5>{item.title}</h5>
            <button className={styles.toggleBtn}>{chevronDown}</button>
          </div>

          <div className={styles.body}>
            <div className="content ">
              <QuillReader delta={item.content} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Tabs;
