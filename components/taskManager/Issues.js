import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import { authLogout } from "../../store/actions/Authentication";
import { Colors } from "../../constants/config";
import IssueCard from "./IssueCard";
import { getAllTasks } from "../../store/actions/Tasks";
import Indicator from "./../custom/Indicator";

const Issues = ({ navigation }) => {
  const dispatch = useDispatch();
  const allTasks = useSelector((state) => state.tasks.allTasks);
  const isLoading = useSelector((state) => state.ui.isLoading);
  // const user = useSelector((state) => state.user.user);

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
    dispatch(getAllTasks());
  }, []);

  const logoutHandler = () => {
    dispatch(authLogout());
    navigation.navigate("Foresight");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>All issues</Text>
      {isLoading ? (
        <Indicator />
      ) : (
        <ScrollView>
          {allTasks.length > 0 ? (
            allTasks.map((data, index) => (
              <IssueCard
                issueKey={data.title}
                summary="Test"
                onPress={() => {}}
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
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 16,
    marginLeft: 12,
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
