import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Colors } from "../../constants/config";

const Dropdown = (props) => {
  return (
    <>
      <TouchableOpacity
        onPress={props.toggleHandler}
        activeOpacity={1}
        style={[styles.dropDown, { height: 46, marginTop: 12 }]}
      >
        {props.enableEdit && (
          <View style={styles.arrow}>
            {!props.isVisible ? (
              <Image source={require("../../assets/expand_more.png")} />
            ) : (
              <Image source={require("../../assets/expand_more_up.png")} />
            )}
          </View>
        )}
        <View style={[styles.dropDownDisplay]}>
          <Text style={styles.labelStyle}>{props.selectedItem}</Text>
        </View>
        <View style={{ marginRight: props.labelMarginRight }}>
          <Text>{props.label}</Text>
        </View>
      </TouchableOpacity>
      {props.isVisible && (
        <View style={styles.dropDown}>
          <ScrollView
            showsVerticalScrollIndicator={true}
            persistentScrollbar={true}
            style={{ width: "100%" }}
            nestedScrollEnabled={true}
          >
            {props.items.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => props.selectItemHandler(item)}
                style={styles.dropDownItem}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  dropDown: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: Colors.borderColor,
    zIndex: 100,
  },
  dropDownItem: {
    width: "90%",
    justifyContent: "center",
    paddingVertical: 6,
  },
  dropDownDisplay: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    flexGrow: 1,
  },
  arrow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    paddingVertical: 8,
  },
  labelStyle: {
    flex: 1,
    justifyContent: "center",
    textAlign: "right",
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.black,
    marginRight: 24,
  },
});
