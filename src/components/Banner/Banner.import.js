import React from "react";
import { Link, useLocation } from "react-router-dom";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import LLink from "../LLink";
import { SlickArrowLeft, SlickArrowRight } from "../slickArrows";
import {
  brokenImage,
  placeholder as placeholderImg,
} from "../../assets/images";

import styles from "./Banner.module.css";

const getPath = (type, product) => {
  const map = [
    {
      type: "tour",
      category: "europe",
      path: "/du-lich-chau-au",
    },
    {
      type: "tour",
      category: "vi",
      path: "/du-lich-trong-nuoc",
    },
    {
      type: "article",
      category: "cam-nang",
      path: "/guides/cam-nang-du-lich",
    },
    {
      type: "article",
      category: "diem-den",
      path: "/guides/diem-den-hap-dan",
    },
    {
      type: "article",
      category: "kinh-nghiem",
      path: "/guides/kinh-nghiem-kham-pha",
    },
    {
      type: "article",
      category: "nhat-ky",
      path: "/guides/nhat-ky-hanh-trinh",
    },
  ];

  return map.find(
    (item) => item.type === type && product.category.includes(item.category)
  ).path;
};

const settings = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  speed: 1000,
  autoplay: true,
  autoplaySpeed: 2500,
  prevArrow: <SlickArrowLeft infinite />,
  nextArrow: <SlickArrowRight slidesToShow={1} slidesToScroll={1} infinite />,
};

const handlerBrokenImg = (e) => {
  e.target.src = brokenImage;
};

const BannerContainer = ({ children }) => {
  return (
    <div className={styles.container + " bannerContainer"}>
      <div className={styles.wrapper}>
        <div className={styles.banner}>{children}</div>
      </div>
    </div>
  );
};

let Pending = () => (
  <div className="d-flex align-items-center justify-content-center bg-secondary h-100"></div>
);

let Failure = ({ msg }) => (
  <div className="d-flex align-items-center justify-content-center bg-secondary h-100">
    <div>
      <p className="text-center text-light mb-2">
        Opps! Something wrong happened.
      </p>
      <p className="text-center text-light">{msg}</p>
    </div>
  </div>
);

let Image = ({ src }) => (
  <img
    className={styles.bannerImage}
    src={src}
    alt="banner"
    onError={handlerBrokenImg}
  />
);

const createMsg = (httpCode, message) =>
  httpCode ? httpCode + " - " + message : message;

const SliderItem = ({ to, image, alt }) => {
  return (
    <LLink className={styles.sliderItem} to={to}>
      <img src={image} alt={alt} onError={handlerBrokenImg} />
    </LLink>
  );
};

export {
  Image,
  Failure,
  Pending,
  BannerContainer,
  React,
  Link,
  useLocation,
  Slider,
  useSelector,
  SlickArrowLeft,
  SlickArrowRight,
  brokenImage,
  placeholderImg,
  styles,
  getPath,
  createMsg,
  SliderItem,
  settings,
};
