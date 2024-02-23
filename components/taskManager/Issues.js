import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from 'react-redux';

import { authLogout } from "../../store/actions/Authentication";
import { Colors } from "../../constants/config";
import AddIssueModal from "../models/AddIssueModal";
import TeamCard from "./TeamCard";
import IssueCard from "./IssueCard";

const teams = [];
const members = [];
const labels = [];
const tasks = {
  title: "task1",
  status: "TODO",
  priority: "LOW",
};

const Issues = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
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

  const addIssueHandler = () => {
    setShowAddIssue(true);
  }

  const closeAddIssue = () => {
    setShowAddIssue(false);
  }

  return (
    <View style={styles.container}>
      <AddIssueModal
        showModal={showAddIssue}
        teams={teams}
        members={members}
        labels={labels}
        closeModal={closeAddIssue}
      />
      <Text style={styles.headerText}>All issues</Text>
      <ScrollView>
        <IssueCard
          issueKey="T1-1"
          issueSummary="Edit button text in the manager screen when do deactivate"
        />
        <IssueCard
          issueKey="T2-1"
          issueSummary="Edit button color"
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

export default Issues;

