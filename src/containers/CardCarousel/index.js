import { Slider, settings } from "./CardCarousel.import";
import styles from "./CardCarousel.module.css";
import "./CardCarousel.override.css";

function CardCarousel({ cards }) {
  return (
    <div className={styles.container + " cardCarousel"}>
      {cards && (
        <Slider {...settings}>
          {cards.map(({ card, id }) => (
            <div className={styles.carouselItem} key={id}>
              {card}
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}

export default CardCarousel;
