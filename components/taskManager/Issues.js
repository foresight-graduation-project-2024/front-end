import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import { authLogout } from "../../store/actions/Authentication";
import { Colors } from "../../constants/config";
import IssueCard from "./IssueCard";
import { getAllTasks, getTaskDetails } from "../../store/actions/Tasks";
import Indicator from "./../custom/Indicator";
import TaskDetailsModal from "../models/TaskDetailsModal";
import { getUserTasks } from "../../store/actions/Users";

const Issues = ({ navigation }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const allTasks = user.role === "TECHNICAL_MANAGER" 
    ? useSelector((state) => state.tasks.allTasks) 
    : useSelector((state) => state.user.userTasks);
  const isLoading = useSelector((state) => state.ui.isLoading);

  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [taskDetails, setTaskDetails] = useState();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.navIcon}>
          <Ionicons
            name="log-out-outline"
            size={24}
            color="white"
            onPress={logoutHandler}
          />
        </View>
      ),
    });
    user.role === "TECHNICAL_MANAGER" 
      ? dispatch(getAllTasks()) 
      : dispatch(getUserTasks(user.id));
  }, []);

  const logoutHandler = () => {
    dispatch(authLogout());
    navigation.navigate("Foresight");
  };

  const showTaskDetailsHandler = async (data) => {
    const taskData = await dispatch(getTaskDetails(data.taskId));
    if (taskData) {
      setTaskDetails(taskData);
      setShowTaskDetails(true);
    }
  };

  const closeTaskDetailsHandler = () => {
    setShowTaskDetails(false);
  };

  return (
    <View style={styles.container}>
      <TaskDetailsModal
        showModal={showTaskDetails}
        closeModal={closeTaskDetailsHandler}
        taskDetails={taskDetails}
      />

      <Text style={styles.headerText}>All issues</Text>
      {isLoading ? (
        <Indicator />
      ) : (
        <ScrollView>
          {allTasks && allTasks.length > 0 ? (
            allTasks.map((data, index) => (
              <IssueCard
                key={index}
                issueKey={data.title}
                summary={data.summary}
                onPress={() => {
                  showTaskDetailsHandler(data);
                }}
              />
            ))
          ) : (
            <Text style={styles.noTask}>No tasks exist!</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navIcon: {
    marginRight: 12,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 4,
  },
  noTask: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 48,
  },
});

export default Issues;
