import { Outlet } from "react-router-dom";
import Banner from "../../components/Banner";
import styles from "./Layout.module.css";
import Navbar from "../../containers/Navbar";
import Footer from "../../containers/Footer";

function DefaultLayout() {
  return (
    <div className={styles.main}>
      <Navbar />
      <div className={styles.body}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
