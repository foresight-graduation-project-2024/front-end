import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { SwiperFlatList } from "react-native-swiper-flatlist";

import { Colors, STATUS } from "../constants/config";
import { deleteTeam, getTaskDetails } from "../store/actions/Tasks";
import TaskCard from "../components/taskManager/TaskCard";
import AddTaskModal from "../components/models/AddTaskModal";
import AddEditTeamModal from "../components/models/AddEditTeamModal";
import ConfirmModal from "../components/models/ConfirmModal";
import TaskDetailsModal from "../components/models/TaskDetailsModal";
import MembersModal from "../components/models/MembersModal";
import WebSocketComponent from "../components/notification/WebSocketComponent";

const { width } = Dimensions.get("window");

const ManageTasks = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [showAddIssue, setShowAddIssue] = useState(false);
  const [showAddTeam, setShowAddTeam] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [taskDetails, setTaskDetails] = useState();

  const data = route.params?.teamData;
  const allTeamTasks = data.teamTasks;
  const allMembers = data.members;

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
  };

  const closeTaskDetailsHandler = () => {
    setShowTaskDetails(false);
  };

  const openMemberModalHandler = () => {
    setShowMemberModal(true);
  };
  const closeMemberModalHandler = () => {
    setShowMemberModal(false);
  };

  return (
    <View style={styles.mainContainer}>
      <AddTaskModal
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
        allMembers={allMembers}
        navigation={navigation}
      />
      <MembersModal
        showModal={showMemberModal}
        closeModal={closeMemberModalHandler}
        allMembers={allMembers}
        teamId={data.teamId}
        teamLeader={data.teamLeader.email}
        navigation={navigation}
      />

      <WebSocketComponent userId={user.id} />

      {user.role === "TECHNICAL_MANAGER" && (
        <View style={styles.membersContent}>
          <View style={styles.members}>
            {allMembers?.length > 0 &&
              allMembers.map((data, index) => (
                <View key={index}>
                  {index < 6 ? (
                    <View style={styles.assigneeContainer}>
                      <Text style={styles.assigneeText}>
                        {data.firstname[0]}
                        {data.lastname[0]}
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.assigneeContainer}>
                      <Text style={styles.assigneeText}>
                        +{allMembers?.length - 6}
                      </Text>
                    </View>
                  )}
                </View>
              ))}
          </View>

          <TouchableOpacity onPress={openMemberModalHandler}>
            <Image
              source={require("../assets/add-user.png")}
              style={styles.addImg}
            />
          </TouchableOpacity>
        </View>
      )}

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
                <Text>({filteredTasks?.length || 0})</Text>
              </View>
              <ScrollView style={styles.scrollStyle}>
                {filteredTasks?.length > 0 ? (
                  filteredTasks.map((data, index) => (
                    <TaskCard
                      key={index}
                      signature={data.title}
                      summary={data.summary}
                      priority={data.priority}
                      assignee={data.assignee}
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
  membersContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 12,
    marginBottom: 4,
  },
  members: {
    flexDirection: "row",
  },
  assigneeContainer: {
    width: 34,
    height: 34,
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 17,
    marginLeft: -4,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
  },
  assigneeText: {
    textAlign: "center",
    color: Colors.white,
  },
  addImg: {
    width: 24,
    height: 24,
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
