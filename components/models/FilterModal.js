import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import FilterSelection from "../manager/FilterSelection";

const FilterModal = () => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.showModal}
      onRequestClose={props.closeModal}
    >
      <View style={styles.modalView}>
        <View style={styles.modalContent}>
          <View style={styles.content}>
            <View style={styles.headerPicker}>
              <Text style={styles.titlePicker}>{"Filter"}</Text>
              <TouchableOpacity onPress={props.closeModal}>
                <Image
                  source={require("../../assets/close.png")}
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
            </View>

            <View>
              <FilterSelection
                onPress={() => handlePress("day")}
                selectedPeriod={props.selectedFilter === "day" ? true : false}
                periodRange={i18n.t("thisDay")}
              />

              <FilterSelection
                onPress={() => handlePress("weeks")}
                selectedPeriod={props.selectedFilter === "weeks"}
                periodRange={i18n.t("thisWeek")}
              />

              <FilterSelection
                onPress={() => handlePress("months")}
                selectedPeriod={props.selectedFilter === "months"}
                periodRange={i18n.t("thisMonth")}
              />

              <FilterSelection
                onPress={() => handlePress("years")}
                selectedPeriod={props.selectedFilter === "years"}
                periodRange={i18n.t("thisYear")}
              />

              <FilterSelection
                onPress={() => handlePress("all")}
                selectedPeriod={props.selectedFilter === "all"}
                periodRange={i18n.t("all")}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    height: "25%",
    width: "100%",
    alignSelf: "center",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
  },
  modalContent: {
    width: "100%",
    backgroundColor: Colors.white,
    borderRadius: 24,
    paddingVertical: 24,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});

export default FilterModal;
