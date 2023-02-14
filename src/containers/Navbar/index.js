// main
import { useLocation, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

// components
import LNavLink from "../../components/LNavLink";
import NavTopBar from "./NavTopBar";
import Search from "./Search";

// css
import "./navbar.css";

function Header() {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    {
      label: t("header.navBar.home"),
      to: "/",
    },
    {
      label: t("header.navBar.euTours"),
      to: "/du-lich-chau-au",
    },
    {
      label: t("header.navBar.viTours"),
      to: "/du-lich-trong-nuoc",
    },
    {
      label: t("header.navBar.visaService"),
      to: "/dich-vu-visa",
    },
    {
      label: t("header.navBar.about"),
      to: "/gioi-thieu",
    },
    {
      label: t("header.navBar.guides"),
      to: "/guides",
    },
  ];
  useEffect(() => {
    if (expanded) {
      setExpanded(false);
    }
  }, [location]);

  const LogoComponent = location.pathname === "/" ? "a" : Link;

  const isShowSearchBar = !(
    location.pathname.startsWith("/du-lich/tim-kiem") ||
    location.pathname.slice(3).startsWith("/du-lich/tim-kiem")
  );
  return (
    <>
      <div className="travel__navbar">
        <div className="container-fluid travel__navbar__inner">
          <NavTopBar />
          <Navbar
            expand="lg"
            bg="white"
            expanded={expanded}
            onToggle={() => setExpanded((prev) => !prev)}
          >
            <Container fluid>
              <Navbar.Brand>
                <LogoComponent
                  to="/"
                  href="https://joya.com.vn"
                  className="travel__navbar__branch"
                >
                  <h5 className="m-0 text-center">JOYA LOGO</h5>
                  <h6 className="m-0 text-center">Slogan here</h6>
                </LogoComponent>
              </Navbar.Brand>

              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />

              <Navbar.Offcanvas placement="end">
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                    <div className="travel__navbar__branch">
                      <h5 className="m-0 text-center">JOYA LOGO</h5>
                      <h6 className="m-0 text-center">Slogan here</h6>
                    </div>
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    {navItems.map((item) => (
                      <LNavLink key={item.to} end to={item.to}>
                        {item.label}
                      </LNavLink>
                    ))}
                  </Nav>
                  {isShowSearchBar && (
                    <div className="d-lg-flex align-items-center d-none">
                      <Search />
                    </div>
                  )}
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>

          {isShowSearchBar && (
            <div className="container-fluid pb-3 d-block d-sm-none">
              <Search />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
