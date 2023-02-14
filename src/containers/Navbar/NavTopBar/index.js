import { earth as earthSVG } from "../../../assets/svgs";
import { useTranslation } from "react-i18next";
import Search from "../Search";
import "./NavTopBar.css";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function NavTopBar() {
  const { t } = useTranslation();
  let { lang } = useParams();
  if (!lang) {
    lang = "";
  }
  const location = useLocation();
  const navigate = useNavigate();
  const hotline = useSelector((state) => state.company.company.hotline);
  const langChangeHandler = (e) => {
    if (!e.target.value) {
      navigate(location.pathname.slice(3));
    } else {
      navigate("/en" + location.pathname);
    }
  };

  const isShowSearchBar = !(
    location.pathname.startsWith("/du-lich/tim-kiem") ||
    location.pathname.slice(3).startsWith("/du-lich/tim-kiem")
  );

  return (
    <div className="container-fluid travel__topbar d-flex align-items-center justify-content-lg-between">
      <div className="travel__topbar__contact  pe-2">
        {hotline && (
          <p className="m-0 text-nowrap ">
            <strong>Hotline:</strong>{" "}
            <a className="travel__topbar__tel" href={`tel: ${hotline}`}>
              {hotline}
            </a>
          </p>
        )}
      </div>
      <div className="ms-2 travel__language">
        <label className="d-flex align-items-center text-nowrap">
          {earthSVG}{" "}
          <span className="d-none d-md-inline">
            {t("header.topBar.language")}
          </span>
          <select onChange={langChangeHandler} value={lang}>
            <option value="">Tiếng Việt</option>
            <option value="en">English</option>
          </select>
        </label>
      </div>

      {isShowSearchBar && (
        <div className="d-none d-sm-flex d-lg-none justify-content-end  w-100">
          <Search />
        </div>
      )}
    </div>
  );
}

export default NavTopBar;
