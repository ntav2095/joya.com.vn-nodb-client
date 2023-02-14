// main
import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import GoToTop from "./components/GoToTop";
import { liveChat } from "./containers/Livechat";
import DefaultLayout from "./layout/DefaultLayout";
import routes from "./routes";
import { fetchTours } from "./store/tours.slice";
import { fetchGuides } from "./store/guides.slice";
import { getCompanyInfo } from "./store/company.slice";
import { useTranslation } from "react-i18next";
import LanguageProxy from "./components/LanguageProxy";

function App() {
  const dispatch = useDispatch();
  const lang = useTranslation().i18n.language;
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      liveChat();
    }, 2000);
  }, []);

  // useLazyLoading();

  useEffect(() => {
    dispatch(fetchTours());
    dispatch(fetchGuides());
    dispatch(getCompanyInfo());
  }, [lang]);

  const availableLanguages = ["en"];

  const isForeignLanguage = availableLanguages.some((item) =>
    location.pathname.startsWith(`/${item}`)
  );

  return (
    <>
      <GoToTop />
      <Routes>
        {isForeignLanguage && (
          <Route path=":lang" element={<LanguageProxy />}>
            <Route element={<DefaultLayout />}>
              {routes.map((route) => {
                if (route.path || route.path === "") {
                  if (route.path === "") {
                    return (
                      <Route
                        key={route.path}
                        index={true}
                        element={route.element}
                      />
                    );
                  } else {
                    return (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                      />
                    );
                  }
                } else {
                  return route.paths.map((path) => (
                    <Route key={path} path={path} element={route.element} />
                  ));
                }
              })}
            </Route>
          </Route>
        )}

        {!isForeignLanguage && (
          <Route path="/" element={<LanguageProxy />}>
            <Route element={<DefaultLayout />}>
              {routes.map((route) => {
                if (route.path || route.path === "") {
                  if (route.path === "") {
                    return (
                      <Route
                        key={route.path}
                        index={true}
                        element={route.element}
                      />
                    );
                  } else {
                    return (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                      />
                    );
                  }
                } else {
                  return route.paths.map((path) => (
                    <Route key={path} path={path} element={route.element} />
                  ));
                }
              })}
            </Route>
          </Route>
        )}
      </Routes>
    </>
  );
}

export default App;
