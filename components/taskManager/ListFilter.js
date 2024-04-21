import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constants/config";

const ListFilter = ({ filterType, taskTypeFilter, onChangeTaskTypeFilter }) => {
  // const [taskTypeFilter, setTaskTypeFilter] = useState("TODO");
  const isSelected = taskTypeFilter === filterType;

  return (
    <TouchableOpacity
      style={[
        styles.filter,
        {
          backgroundColor: isSelected ? Colors.primary : Colors.white,
        },
      ]}
      onPress={() => onChangeTaskTypeFilter(filterType)}
    >
      <Text
        style={[
          styles.text,
          {
            color: isSelected ? Colors.white : Colors.black,
          },
        ]}
      >
        {filterType}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  filter: {
    flexDirection: "row",
    height: 42,
    textAlign: "center",
    marginBottom: 12,
    marginRight: 12,
    borderRadius: 8,
  },
});

export default ListFilter;
