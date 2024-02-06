import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ListFilter from "../components/taskManager/ListFilter";
import TeamCard from "../components/taskManager/TeamCard";
import { authLogout } from "../store/actions/Authentication";
import { useDispatch, useSelector } from "react-redux";
import AddIssueModal from "../components/models/AddIssueModal";

const teams = [];
const members = [];
const labels = [];
const tasks = {
  title: "task1",
  status: "TODO",
  priority: "LOW",
};

const ManageTasks = ({ navigation }) => {
  const dispatch = useDispatch();
  const [taskTypeFilter, setTaskTypeFilter] = useState("TODO");
  const [showAddIssue, setShowAddIssue] = useState(false);
  const user = useSelector((state) => state.user.user);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => <Text style={styles.navHeader}>Board</Text>,
      headerRight: () => (
        <View style={styles.logout}>
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

  const logoutHandler = () => {
    dispatch(authLogout());
    navigation.navigate("Foresight");
  };

  const openAddIssue = () => {
    setShowAddIssue((prev) => setShowAddIssue(!prev));
  }
  const closeAddIssue = () => {
    setShowAddIssue((prev) => setShowAddIssue(!prev));
  }

  return (
    <View style={styles.mainContainer}>
      <AddIssueModal
        showModal={showAddIssue}
        teams={teams}
        members={members}
        labels={labels}
        closeModal={closeAddIssue}
      />
      <View style={styles.mainHeader}>
        <View style={styles.headersContent}>
          <Text style={styles.headerName}>Your teams</Text>
          {user.role === "ADMIN" &&
            <TouchableOpacity>
              <Text style={styles.headerName}>Add team</Text>
            </TouchableOpacity>
          }
        </View>
        <TeamCard
          teamLogo={require("../assets/mark.png")}
          teamName="test1"
          teamDescription="This is a test for team 1"
        />
      </View>

      <View style={styles.titleView}>
        <Text style={styles.headerName}>Your tasks</Text>
        <ScrollView
          style={{ flexDirection: "row" }}
          horizontal={true}
          showsHorizontalScrollIndicator={true}
        >
          <ListFilter
            filterType="TODO"
            taskTypeFilter={taskTypeFilter}
            onChangeTaskTypeFilter={setTaskTypeFilter}
          />
          <ListFilter
            filterType="INPROGRESS"
            taskTypeFilter={taskTypeFilter}
            onChangeTaskTypeFilter={setTaskTypeFilter}
          />
          <ListFilter
            filterType="DONE"
            taskTypeFilter={taskTypeFilter}
            onChangeTaskTypeFilter={setTaskTypeFilter}
          />
        </ScrollView>
      </View>
      <View style={styles.tasksContainer}>
        <Text style={styles.taskTypeHeader}>{taskTypeFilter}</Text>
        <ScrollView style={styles.scrollStyle}>
          <TouchableOpacity style={styles.taskContent}>
            <View>
              <Text>{tasks.title}</Text>
              <Text>{tasks.priority}</Text>
            </View>
            <View style={styles.assigneeContainer}>
              {/* <Text style={styles.assigneeText}>
                {members.firstname[0]}{members.lastname[0]}
              </Text> */}
              <Text style={styles.assigneeText}>{"M"}{"H"}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.taskContent}>
            <View>
              <Text>{tasks.title}</Text>
              <Text>{tasks.priority}</Text>
            </View>
            <View style={styles.assigneeContainer}>
              <Text style={styles.assigneeText}>{"M"}{"H"}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addIssue}
            onPress={openAddIssue}
          >
            <Ionicons
              name="add"
              size={22}
              color={Colors.grey}
              style={{ marginTop: 2 }}
            />
            <Text style={styles.addIssueText}>Add issue</Text>
          </TouchableOpacity>
        </ScrollView>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.white,
  },
  logout: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  mainContainer: {
    width: "100%",
    padding: 16,
  },
  mainHeader: {
    marginBottom: 32,
  },
  headersContent: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  headerName: {
    fontSize: 18,
    color: Colors.black,
    marginBottom: 8,
  },
  titleView: {
    width: "100%",
    marginTop: -8,
  },
  tasksContainer: {
    width: "94%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingVertical: 12,
    marginVertical: 16,
    borderRadius: 8,
  },
  taskTypeHeader: {
    marginBottom: 12,
    fontSize: 16,
    fontWeight: "bold",
  },
  scrollStyle: {
    width: "94%",
  },
  taskContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.mainBackground,
    padding: 12,
    borderRadius: 6,
    marginVertical: 4,
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
  addIssue: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  addIssueText: {
    fontSize: 16,
  },
});

export default ManageTasks;
