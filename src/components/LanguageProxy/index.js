import { useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";
import i18next from "../../services/languages/i18n";

function LanguageProxy() {
  const { lang } = useParams();

  const availableLang = ["en"];

  useEffect(() => {
    if (!lang) {
      i18next.changeLanguage("vi");
    } else {
      if (availableLang.includes(lang)) {
        i18next.changeLanguage(lang);
      }
    }
  }, [lang]);
  return <Outlet />;
}

export default LanguageProxy;
