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
