import { I18n } from "i18n-js";
import { ar, en } from "../assets/i18n";
import * as Localization from "expo-localization";

const i18n = new I18n();
i18n.enableFallback = true;
i18n.translations = {ar, en};
i18n.locale = Localization.locale;

// const changeLanguage = () => {
//   console.log(`i18n.locale`, i18n.locale);
//   if (i18n.locale === "ar") i18n.locale = "en-US";
//   else i18n.locale = "ar";
// };

export default i18n;
// export {changeLanguage};