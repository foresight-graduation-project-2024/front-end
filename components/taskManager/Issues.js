import React, { useCallback, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import { authLogout } from "../../store/actions/Authentication";
import { Colors } from "../../constants/config";
import IssueCard from "./IssueCard";
import {
  getAllTasks,
  getTaskDetails,
  getTeamDetails,
} from "../../store/actions/Tasks";
import Indicator from "./../custom/Indicator";
import TaskDetailsModal from "../models/TaskDetailsModal";

const Issues = ({ navigation }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const allTeams = useSelector((state) => state.tasks.teams);

  const allUserTasks =
    user.role === "TECHNICAL_MANAGER"
      ? useSelector((state) => state.tasks.allTasks)
      : useSelector((state) => state.user.userTasks);

  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [taskDetails, setTaskDetails] = useState();
  const [allTasks, setAllTasks] = useState(allUserTasks);

  const getTeamTasksForTeamLeader = async () => {
    const curUserTeams =
      allTeams &&
      allTeams.filter((team) => team.teamLeader.email === user.email);

    const teamIds = curUserTeams && curUserTeams.map((team) => team.teamId);

    if (teamIds) {
      const additionalTasks = await Promise.all(
        teamIds.map((id) => dispatch(getTeamDetails(id)))
      );

      const tasksFromAdditionalTasks = await additionalTasks.flatMap(
        (team) => team.teamTasks
      );

      setAllTasks((prevTasks) => {
        const newTasks = tasksFromAdditionalTasks.filter(
          (task) =>
            !prevTasks.some((prevTask) => prevTask.taskId === task.taskId)
        );
        return [...prevTasks, ...newTasks];
      });
    }
  };

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
  }, []);

  useFocusEffect(useCallback(() => {
    user.role === "TECHNICAL_MANAGER" ? dispatch(getAllTasks()) : getTeamTasksForTeamLeader();
  }, [user.role, dispatch]));

  const logoutHandler = () => {
    dispatch(authLogout());
    navigation.replace("Foresight");
  };

  const showTaskDetailsHandler = async (taskId) => {
    const taskData = await dispatch(getTaskDetails(taskId));
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
        navigation={navigation}
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
                  showTaskDetailsHandler(data.taskId);
                }}
                disableClickable={true}
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
