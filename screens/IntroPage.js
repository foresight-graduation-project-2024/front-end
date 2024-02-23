import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import i18n from "i18n-js";

import { ar, en } from "../assets/i18n";

const IntroPage = () => {
  i18n.fallbacks = true;
  i18n.translations = { ar, en };
  i18n.locale = this.props.language || 'ar';
  i18n.missingTranslation = (key) => {
    return i18n.translations['ar'][key] || key;
  };

  return (
    <View>
      <Text>IntroPage</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

export default IntroPage

// onChangeLanguage = () => {
//   if (this.props.language === "ar") this.props.setLanguage("en");
//   else this.props.setLanguage("ar");

//   // Start the quiz over.
//   const test = this.props.tests.filter(
//     (test) => test.id === this.props.programId
//   );
//   const isQuizCompleted = test.isQuizCompleted;
//   if (!isQuizCompleted) {
//     this.props.clearLocalDataRelatedToQuiz();
//   }

//   this.setState({ showChangeLanguageModal: false });
// };