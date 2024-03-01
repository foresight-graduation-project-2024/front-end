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
import { SwiperFlatList } from "react-native-swiper-flatlist";

import { Colors, STATUS } from "../constants/config";
import AddEditIssueModal from "../components/models/AddEditIssueModal";
import TaskCard from "../components/taskManager/TaskCard";
import { deleteTeam, getTaskDetails, getTeamTasks } from "../store/actions/Tasks";
import AddEditTeamModal from "../components/models/AddEditTeamModal";
import ConfirmModal from "../components/models/ConfirmModal";
import TaskDetailsModal from "../components/models/TaskDetailsModal";

const { width } = Dimensions.get("window");

// const teams = [];
// const members = [];

const ManageTasks = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [showAddIssue, setShowAddIssue] = useState(false);
  const [showAddTeam, setShowAddTeam] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [taskDetails, setTaskDetails] = useState();

  const data = route.params?.teamData;
  const allTeamTasks = data.teamTasks;
  // console.log(allTeamTasks);

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
            onPress={openEditTeam}
          />
        </View>
      ),
    });
  }, []);

  const openDeleteModal = () => {
    setDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const deleteTeamHandler = async () => {
    const resp = await dispatch(deleteTeam(data.teamId));
    resp && navigation.goBack();
  };

  const openAddIssue = () => {
    setShowAddIssue(true);
  };
  const closeAddIssue = () => {
    setShowAddIssue(false);
  };

  const openEditTeam = () => {
    setShowAddTeam(true);
  };
  const closeAddTeam = () => {
    setShowAddTeam(false);
  };

  const taskPressHandler = async (data) => {
    const taskData = await dispatch(getTaskDetails(data.taskId));
    if (taskData) {
      setTaskDetails(taskData);
      setShowTaskDetails(true);
    }
  }

  const closeTaskDetailsHandler = () => {
    setShowTaskDetails(false);
  }

  return (
    <View style={styles.mainContainer}>
      <AddEditIssueModal
        showModal={showAddIssue}
        teamId={data.teamId}
        closeModal={closeAddIssue}
        signature={data.signature}
        navigation={navigation}
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
      <TaskDetailsModal 
        showModal={showTaskDetails}
        closeModal={closeTaskDetailsHandler}
        taskDetails={taskDetails}
      />

      {/* TODO Show members if this member is the team leader of technical manager */}

      <SwiperFlatList
        data={STATUS}
        renderItem={({ item }) => {
          const filteredTasks = allTeamTasks?.filter(
            (task) => task.status === item
          );
          return (
            <View style={styles.tasksContainer}>
              <View style={styles.taskType}>
                <Text style={styles.taskTypeHeader}>{item}</Text>
                <Text>({filteredTasks.length})</Text>
              </View>
              <ScrollView style={styles.scrollStyle}>
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((data, index) => (
                    <TaskCard
                      key={index}
                      signature={data.title}
                      summary={data.summary}
                      priority={data.priority}
                      onPress={() => taskPressHandler(data)}
                    />
                  ))
                ) : (
                  <Text style={styles.noTasks}>No tasks exist!</Text>
                )}

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
          );
        }}
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
  noTasks: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 18,
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
