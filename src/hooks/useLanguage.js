import { useContext } from "react";
import i18n from "../config/i18n"; // Make sure the path is correct
import LocaleContext from "../context/LocaleContext"; // Assuming you have a LocaleContext

const useLanguage = () => {
  const { setLocale } = useContext(LocaleContext);

  const currentLanguage = i18n.language; // Get the current language
  
  const changeLanguage = (lang) => {
    console.log("called function changeLanguage");
    i18n.changeLanguage(lang); // Change the i18n language
    setLocale(lang); // Update your locale context if needed
  };

  return { changeLanguage, currentLanguage };
};

export default useLanguage;
