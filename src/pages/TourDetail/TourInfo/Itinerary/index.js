import styles from "./Itinerary.module.css";
import { useState } from "react";
import { chevronDown } from "../../../../assets/svgs";
import QuillReader from "../QuillReader";
import TourCarousel from "../../TourCarousel";

function Itinerary({ data }) {
  const [show, setShow] = useState([]);
  console.log(data);

  const toggleHandler = (id) => {
    setShow((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isActive = (id) => show.includes(id);

  return (
    <div className={styles.itinerary}>
      {data.map((item) => (
        <div
          className={
            isActive(item.id)
              ? styles.tabItem + " " + styles.active
              : styles.tabItem
          }
          key={item.id}
        >
          <div className={styles.header} onClick={() => toggleHandler(item.id)}>
            <div>
              <h6>{item.day}</h6>
              <h5>{item.destination}</h5>
            </div>
            <button className={styles.toggleBtn}>{chevronDown}</button>
          </div>

          <div className={styles.body}>
            <div className="content ">
              {item.images.length > 0 && (
                <div className={styles.slider}>
                  <TourCarousel
                    height={"250px"}
                    isLoading={false}
                    slider={item.images}
                    size="sm"
                    centerPadding="40px"
                  />
                </div>
              )}
              <QuillReader delta={item.content} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Itinerary;
