import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "../../constants/config";

const TaskCard = (props) => {
  return (
    <TouchableOpacity style={styles.taskContent} onPress={props.onPress}>
      <View>
        <Text style={styles.taskSummary}>{props.summary}</Text>
        <View style={styles.labelContent}>
          <Text>{props.priority}</Text>
        </View>
      </View>
      <View style={styles.taskFooter}>
        <Text>{props.signature}</Text>
        <View style={styles.assigneeContainer}>
          {props.assignee ? (
            <Text style={styles.assigneeText}>
              {props.assignee.firstname[0]}
              {props.assignee.lastname[0]}
            </Text>
          ) : (
            <Text style={styles.assigneeText}>
              {"N"}
              {"A"}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  taskContent: {
    backgroundColor: Colors.mainBackground,
    padding: 12,
    borderRadius: 12,
    marginVertical: 4,
  },
  taskSummary: {
    fontSize: 16,
    fontWeight: "500",
  },
  labelContent: {
    width: "25%",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginTop: 12,
    borderRadius: 4,
  },
  taskFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  assigneeContainer: {
    width: 24,
    height: 24,
    backgroundColor: Colors.primary,
    borderRadius: 12,
  },
  assigneeText: {
    textAlign: "center",
    fontSize: 10,
    color: Colors.white,
    marginTop: 5,
  },
});

export default TaskCard;
