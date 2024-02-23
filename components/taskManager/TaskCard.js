import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "../../constants/config";

const labels = [];
const tasks = {
  summary: "task1",
  status: "TODO",
  label: "LOW",
  taskNum: "T1-1",
};

const TaskCard = (props) => {
  return (
    <TouchableOpacity style={styles.taskContent}>
      {/* 
        task summary
        label if exist
        task num + first char form first and last name
      */}
      <View>
        <Text style={styles.taskSummary}>{tasks.summary}</Text>
        {tasks?.label && <Text style={styles.taskLabel}>{tasks.label}</Text>}
      </View>
      <View style={styles.taskFooter}>
        {/* <Text style={styles.assigneeText}>
          {members.firstname[0]}{members.lastname[0]}
        </Text> */}
        <Text>{props.signature}</Text>
        <View style={styles.assigneeContainer}>
          <Text style={styles.assigneeText}>
            {"M"}
            {"H"}
          </Text>
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
  taskFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  assigneeContainer: {
    width: 24,
    height: 24,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    marginTop: 12,
  },
  assigneeText: {
    textAlign: "center",
    fontSize: 10,
    color: Colors.white,
    marginTop: 5,
  },
});

export default TaskCard;
