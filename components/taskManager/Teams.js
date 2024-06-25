import React, { useCallback, useLayoutEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import { authLogout } from "../../store/actions/Authentication";
import { Colors } from "../../constants/config";
import TeamCard from "./TeamCard";
import AddEditTeamModal from "./../models/AddEditTeamModal";
import { getAllTasks, getAllTeams, getTeamDetails } from "../../store/actions/Tasks";
import {
  getUsers,
  getUserTasks,
  getUserTeams,
} from "../../store/actions/Users";
import Indicator from "../custom/Indicator";

const Teams = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const teams =
    user.role === "TECHNICAL_MANAGER"
      ? useSelector((state) => state.tasks.teams)
      : useSelector((state) => state.user.userTeams);
  const isLoading = useSelector((state) => state.ui.isLoading);

  const [showAddIssue, setShowAddIssue] = useState(false);

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
          {user.role === "TECHNICAL_MANAGER" && (
            <Ionicons
              name="add"
              size={24}
              color="white"
              onPress={addTeamHandler}
            />
          )}
        </View>
      ),
    });
  }, []);

  useFocusEffect(useCallback(() => {
    if (user.role === "TECHNICAL_MANAGER")
      dispatch(getAllTasks())
    else {
      dispatch(getUserTasks(user.id))
      dispatch(getUserTeams(user.id));
    };

    dispatch(getUsers());
    dispatch(getAllTeams());
  }, [dispatch, user.id, user.role]))

  const logoutHandler = () => {
    dispatch(authLogout());
    navigation.replace("Foresight");
  };

  const addTeamHandler = () => {
    setShowAddIssue(true);
  };

  const closeAddIssue = () => {
    setShowAddIssue(false);
  };

  const teamTasksHandler = async (data) => {
    const teamData = await dispatch(getTeamDetails(data.teamId))
    teamData && navigation.navigate("Board", { teamData });
  };

  return (
    <View style={styles.container}>
      <AddEditTeamModal
        showModal={showAddIssue}
        closeModal={closeAddIssue}
        navigation={navigation}
      />
      <Text style={styles.headerText}>All teams</Text>
      {isLoading ? (
        <Indicator />
      ) : (
        <ScrollView>
          {teams && teams.length > 0 ? (
            teams.map((data, index) => (
              <TeamCard
                key={index}
                teamName={data.name}
                teamDesc={data.description}
                teamKey={data.signature}
                onPress={() => teamTasksHandler(data)}
              />
            ))
          ) : (
            <Text style={styles.noTeam}>No teams exist!</Text>
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
  noTeam: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 48,
  },
});

export default Teams;
