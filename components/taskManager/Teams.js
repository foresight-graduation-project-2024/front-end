import React, { useLayoutEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import { authLogout } from "../../store/actions/Authentication";
import { Colors } from "../../constants/config";
import TeamCard from "./TeamCard";
import AddEditTeamModal from "./../models/AddEditTeamModal";
import { getAllTeams, getTeamDetails } from "../../store/actions/Tasks";
import { getUsers } from "../../store/actions/Users";

const Teams = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const teams = useSelector((state) => state.tasks.teams);
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
    dispatch(getAllTeams());
    dispatch(getUsers());
  }, []);

  const logoutHandler = () => {
    dispatch(authLogout());
    navigation.navigate("Foresight");
  };

  const addTeamHandler = () => {
    setShowAddIssue(true);
  };

  const closeAddIssue = () => {
    setShowAddIssue(false);
  };

  const teamTasksHandler = async (data) => {
    const resp = await dispatch(getTeamDetails(data.teamId));
    resp && navigation.navigate("Board", { data });
  };

  return (
    <View style={styles.container}>
      <AddEditTeamModal
        showModal={showAddIssue}
        closeModal={closeAddIssue}
        navigation={navigation}
      />
      <Text style={styles.headerText}>All teams</Text>
      <ScrollView>
        {teams.length > 0 ? (
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
  }
});

export default Teams;
