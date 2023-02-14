import {
  Image,
  Failure,
  Pending,
  BannerContainer,
  React,
  Slider,
  settings,
  createMsg,
  SliderItem,
} from "./Banner.import";

import "./Banner.override.css";

// banner: {image, isLoading, error}
// banner nhập từ ngoài vào: cái bài chi tiết tour / bài viết
function Banner({ banner, carousel }) {
  let content;

  // ************* BANNER LÀ HÌNH TRUYỀN TỪ NGOÀI VÀO (KHÔNG PHẢI SLIDER) ***********
  if (banner) {
    const { isLoading, error, image } = banner;
    content = <Pending />;

    if (error) {
      content = <Failure msg={createMsg(error.httpCode, error.message)} />;
    }

    if (!isLoading && !error && image) {
      content = <Image src={image} />;
    }
  }

  if (content) return <BannerContainer>{content}</BannerContainer>;
  // ************* END ***********

  // ************* SLIDER ***********
  if (carousel) {
    const { items: carouselItems, isLoading, error, type } = carousel;
    let basePath = "";
    if (type === "tour") {
      basePath = "/du-lich";
    }

    if (type === "guides") {
      basePath = "/guides/bai-viet";
    }

    content = <Pending />;

    if (error) {
      content = <Failure msg={createMsg(error.httpCode, error.message)} />;
    }

    if (!error && !isLoading) {
      content = (
        <Slider {...settings}>
          {carouselItems.map((item) => (
            <SliderItem
              key={item.slug}
              to={`${basePath}/${item.slug}`}
              image={item.banner}
              alt={item.name || item.title}
            />
          ))}
        </Slider>
      );
    }
  }

  return <BannerContainer>{content}</BannerContainer>;
}

export default React.memo(Banner);
