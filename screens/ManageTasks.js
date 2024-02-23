import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ListFilter from "../components/taskManager/ListFilter";
import TeamCard from "../components/taskManager/TeamCard";
import { useDispatch, useSelector } from "react-redux";
import { authLogout } from "../store/actions/Authentication";

import { Colors } from "../constants/config";
import AddIssueModal from "../components/models/AddIssueModal";
import TaskCard from "../components/taskManager/TaskCard";
import { deleteTeam } from "../store/actions/Tasks";
import AddTeamModal from "../components/models/AddTeamModal";

const teams = [];
const members = [];
const labels = [];
const tasks = {
  title: "task1",
  status: "TODO",
  priority: "LOW",
};

const ManageTasks = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [taskTypeFilter, setTaskTypeFilter] = useState("TODO");
  const [showAddIssue, setShowAddIssue] = useState(false);
  const [showAddTeam, setShowAddTeam] = useState(false);
  const user = useSelector((state) => state.user.user);
  const data = route.params?.data;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: data.name || "",
      headerRight: () => (
        <View style={styles.logout}>
          <Ionicons
            name="trash-outline"
            size={24}
            color="white"
            onPress={deleteTeamHandler}
          />
          <Ionicons
            name="eyedrop-outline"
            size={24}
            color="white"
            onPress={openAddTeam}
          />
        </View>
      ),
    });
  }, []);

  const deleteTeamHandler = async () => {
    const resp = await dispatch(deleteTeam(data.teamId))
    resp && navigation.goBack();
  }

  const openAddIssue = () => {
    setShowAddIssue(true);
  };
  const closeAddIssue = () => {
    setShowAddIssue(false);
  };

  const openAddTeam = () => {
    setShowAddTeam(true);
  };
  const closeAddTeam = () => {
    setShowAddTeam(false);
  };

  return (
    <View style={styles.mainContainer}>
      {/* <AddIssueModal
        showModal={showAddIssue}
        teams={teams}
        members={members}
        labels={labels}
        closeModal={closeAddIssue}
      /> */}
      <AddTeamModal
        showModal={showAddTeam}
        closeModal={closeAddTeam}
        navigation={navigation}
      />

      {/* <SwiperFlatList
        autoplay
        autoplayDelay={2}
        autoplayLoop
        index={2}
      > */}
        <View style={styles.tasksContainer}>
          {/* TODO Show members if this member is the team leader */}
          <View style={styles.taskType}>
            <Text style={styles.taskTypeHeader}>TODO</Text>
            <Text>(2)</Text>
          </View>
          <ScrollView style={styles.scrollStyle}>
            <TaskCard signature={data.signature}/>
            <TaskCard signature={data.signature}/>

            {/* TODO Show if this member is the team leader */}
            {/* <TouchableOpacity
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
                </TouchableOpacity> */}
          </ScrollView>
        </View>
      {/* </SwiperFlatList> */}
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
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 12,
  },
  mainContainer: {
    width: "100%",
    padding: 12,
  },
  mainHeader: {
    marginBottom: 32,
  },
  headersContent: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
    borderRadius: 8,
  },
  taskType: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    marginBottom: 12,
    paddingVertical: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  taskTypeHeader: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    marginHorizontal: 16,
  },
  scrollStyle: {
    width: "100%",
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 12,
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
