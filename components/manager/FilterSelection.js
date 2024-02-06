import React from 'react'
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import { Colors } from '../../constants/config'

const FilterSelection = () => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.timeContainer}
    >
      <Text
        // style={[
        //   styles.headerText2, 
        //   props.selectedPeriod 
        //     ? { color: colors.primaryColor } 
        //     : { color: uiColors.textColor1 }
        // ]}
      >
        {props.periodRange}
      </Text>
      <Image 
        source={props.selectedPeriod 
          ? require("../../assets/radio_button_checked.png") 
          : require("../assets/radio_button_unchecked.png")
        }
        style={styles.selectedIcon}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  timeContainer: {
    backgroundColor: Colors.white,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    borderRadius: 12,
  },
  headerText2: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 25
  },
  selectedIcon: { 
    width: 24, 
    height: 24 
  },
})

export default FilterSelection
