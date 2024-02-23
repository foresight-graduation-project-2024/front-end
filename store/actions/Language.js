import AsyncStorage from "@react-native-async-storage/async-storage";
import { i18n } from 'i18n-js';
import { SET_LANGUAGE } from "./actionTypes";

export const setLanguageInLocalStorage = async (value) => {
  await AsyncStorage.setItem('ap:language', value);
}

export const getLanguageFromLocalStorage = async () => {
  const lang = await AsyncStorage.getItem('ap:language');
  return lang || null;
}

export const removeLanguageFromLocalStorage = async ()=>{
  await AsyncStorage.removeItem('ap:language');
}

export const setLanguage = (language) => async (dispatch, getState) => {
  if (!language) {
    language = await getLanguageInLocalStorage();
    if (!language) return;
  } else await setLanguageInLocalStorage(language);

  i18n.local = language;
  i18n.currentLocale(language);

  dispatch({
    type: SET_LANGUAGE,
    language,
  })
}