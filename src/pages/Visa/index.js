// main
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Slider from "react-slick";

// components
import Banner from "../../components/Banner";
import SignupConsultModal from "./SignupConsultModal";
import VisaSteps from "./VisaSteps";
import LLink from "../../components/LLink";

// other
import accentsRemover from "../../services/helpers/accentsRemover";
import usePageTitle from "../../hooks/usePageTitle";
import { countriesImages } from "./mockImages";
import settings from "./responsiveCarousel";
import useAxios from "../../hooks/useAxios";
import { fetchVisaCountries } from "../../services/apis";
import { setVisaTypes } from "../../store/visa.slice";

// css
import styles from "./Visa.module.css";

function VisaService() {
  const dispatch = useDispatch();
  const [sendRequest, isLoading, data, error, resetStates] = useAxios();
  // ******************** init visa *********************************
  useEffect(() => {
    sendRequest(fetchVisaCountries());
  }, []);

  useEffect(() => {
    if (data) dispatch(setVisaTypes(data.data));
  }, [data]);
  // ******************** end init visa *********************************

  const [show, setShow] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const handleClose = () => setShow(false);
  const visa = useSelector((state) => state.visa);

  const results = searchInput.trim()
    ? visa.availableCountries.filter((item) => {
        return accentsRemover(item.name).match(
          new RegExp(accentsRemover(searchInput), "i")
        );
      })
    : null;

  usePageTitle(`Dịch vụ visa || Go Travel`);
  return (
    <>
      <Banner
        storedBanner={{
          type: "image",
          productType: "visa",
          key: "visa",
        }}
      />

      <SignupConsultModal handleClose={handleClose} show={show} />

      <div className="container-lg">
        <div className={styles.container}>
          <div className="p-2">
            <form
              className={styles.searchForm + " shadow p-3 mt-3 bg-white border"}
            >
              <h5>Nhập tên nước bạn muốn làm visa</h5>
              <input
                className={styles.searchInput}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type="text"
                placeholder="Nhập tên nước bạn muốn làm visa"
              />
              <div className={styles.searchResults}>
                {results && results.length > 0 && (
                  <ul className="list-group list-group-flush shadow border w-100 p-2 bg-white">
                    {results.map((item) => (
                      <li
                        key={item.code}
                        className="list-group-item list-group-item-action"
                      >
                        <LLink
                          to={`/dich-vu-visa/${item.code}`}
                          className="d-block"
                        >
                          Dịch vụ visa {item.name}
                        </LLink>
                      </li>
                    ))}
                  </ul>
                )}

                {results && results.length === 0 && (
                  <p className="list-group list-group-flush shadow border w-100 p-2 bg-white">
                    Không có sản phẩm nào
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* quick visa  */}
          <div className={styles.quickVisa}>
            <h2 className="mb-2 pb-0">Làm visa nhanh</h2>

            <div className={styles.chooseVisa}>
              <Slider {...settings}>
                {visa.availableCountries.map((item, index) => (
                  <LLink key={index} to={`/dich-vu-visa/${item.code}`}>
                    <div className={styles.visaProduct}>
                      <div className={styles.inner}>
                        <div
                          className={styles.image}
                          style={{
                            backgroundImage: `url(${
                              countriesImages[item.code]
                            })`,
                          }}
                        />
                        <div className={styles.textBox}>
                          <p className={styles.name}>
                            Dịch vụ visa {item.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </LLink>
                ))}
              </Slider>
            </div>
          </div>
        </div>

        <VisaSteps />
      </div>
    </>
  );
}

export default VisaService;
