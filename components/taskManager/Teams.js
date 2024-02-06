import React, { useLayoutEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import { authLogout } from "../../store/actions/Authentication";
import { Colors } from "../../constants/config";
import TeamCard from "./TeamCard";

const Teams = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

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
              onPress={addIssueHandler}
            />
          )}
        </View>
      ),
    });
  }, []);

  const logoutHandler = () => {
    dispatch(authLogout());
    navigation.navigate("Foresight");
  };

  const addIssueHandler = () => {}

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>All teams</Text>
      <ScrollView>
        <TeamCard
          teamLogo={require("../../assets/project-management.png")}
          teamName="team1"
          teamDescription="This is a test for team 1"
        />
        <TeamCard
          teamLogo={require("../../assets/team.png")}
          teamName="team2"
          teamDescription="This is a test for team 1"
        />
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
  }
});

export default Teams;
