import { useState } from "react";
import { logoPng } from "../assets";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

const Hero = () => {
  const { t, i18n } = useTranslation();
  const currentLocale = Cookies.get("i18next") || "en";
  const [language, setLanguage] = useState(currentLocale);

  const handleChangeLocale = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3 ">
        <div className="flex items-center space-x-2">
          <img
            src={logoPng}
            alt="Summariser Logo"
            className="w-20 m:w-28 object-contain"
          />
          <p className="md:text-3xl text-[#232878] font-bold">Web Synopsis</p>
        </div>

        <button
          type="button"
          onClick={() => window.open("https://github.com/faizkhan12")}
          className="hidden md:flex black_btn"
        >
          Github
        </button>
        <select
          className="bg-white border border-gray-200
             text-[#3E3D40] text-sm font-semibold h-10"
          onChange={handleChangeLocale}
          value={language}
        >
          <option key="en" lang="en" value="en">
            English
          </option>
          <option key="es" lang="es" value="es">
            Spanish
          </option>
          <option key="hi" lang="hi" value="hi">
            Hindi
          </option>
          <option key="ar" lang="ar" value="ar">
            Arabic
          </option>
          <option key="fr" lang="fr" value="fr">
            French
          </option>
        </select>
      </nav>

      <h1 className="head_text">
        {t("header")} <br className="max-md:hidden" />
        <span className="orange_gradient">Chat GPT-4</span>
      </h1>
      <h2 className="desc">{t("paragraph")}</h2>
    </header>
  );
};

export default Hero;
