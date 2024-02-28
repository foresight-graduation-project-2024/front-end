import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import AsyncStorage from "@react-native-async-storage/async-storage";

import ListFilter from "../components/taskManager/ListFilter";
import TeamCard from "../components/taskManager/TeamCard";
import { authLogout } from "../store/actions/Authentication";
import { Colors, STATUS } from "../constants/config";
import AddEditIssueModal from "../components/models/AddEditIssueModal";
import TaskCard from "../components/taskManager/TaskCard";
import { deleteTeam } from "../store/actions/Tasks";
import AddEditTeamModal from "../components/models/AddEditTeamModal";
import ConfirmModal from "../components/models/ConfirmModal";

const { width } = Dimensions.get('window');

// const teams = [];
// const members = [];

const ManageTasks = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [showAddIssue, setShowAddIssue] = useState(false);
  const [showAddTeam, setShowAddTeam] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

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
            onPress={openDeleteModal}
          />
          <Ionicons
            name="ellipsis-vertical-outline"
            size={24}
            color="white"
            onPress={openAddTeam}
          />
        </View>
      ),
    });
  }, []);

  const openDeleteModal = () => {
    setDeleteModal(true);
  }
  const closeDeleteModal = () => {
    setDeleteModal(false);
  }

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
      <AddEditIssueModal
        showModal={showAddIssue}
        teamId={data.teamId}
        closeModal={closeAddIssue}
      />
      <AddEditTeamModal
        showModal={showAddTeam}
        closeModal={closeAddTeam}
        navigation={navigation}
        isEditing={true}
        team={data}
      />
      <ConfirmModal 
        showModal={deleteModal}
        closeModal={closeDeleteModal}
        title={"Are you sure you want to delete this team?"}
        confirmBtn={deleteTeamHandler}
      />

      {/* TODO Show members if this member is the team leader */}

      <SwiperFlatList
        data={STATUS}
        renderItem={({ item }) => (
          <View style={styles.tasksContainer}>
            <View style={styles.taskType}>
              <Text style={styles.taskTypeHeader}>{item}</Text>
              <Text>(2)</Text>
            </View>
            <ScrollView style={styles.scrollStyle}>
              <TaskCard signature={data.signature}/>
              <TaskCard signature={data.signature}/>

              {user.role === "TECHNICAL_MANAGER" && (
                <TouchableOpacity
                  style={styles.addIssue}
                  onPress={openAddIssue}
                >
                  <Ionicons
                    name="add"
                    size={22}
                    color={Colors.lightBlack}
                    style={{ marginTop: 2 }}
                  />
                  <Text style={styles.addIssueText}>Create task</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logout: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 12,
  },
  mainContainer: {
    width: "100%",
    padding: 12,
  },
  tasksContainer: {
    width: width - 22,
    justifyContent: "center",
    paddingVertical: 16,
    paddingRight: 8,
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
