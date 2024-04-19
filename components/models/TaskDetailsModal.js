import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { Colors, PRIORITY, STATUS } from "../../constants/config";
import ConfirmModal from "./ConfirmModal";
import { deleteTask, editTask } from "../../store/actions/Tasks";
import Dropdown from "../custom/Dropdown";
import Button from "../custom/Button";
import DotPulse from "../custom/DotPulse";
import { createUserObject, timeFormat } from "../../constants/Utility";

const TaskDetailsModal = (props) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.ui.isLoading);
  const users = useSelector((state) => state.user.users);

  const initialDropdownState = {
    status: { isVisible: false, selected: STATUS[0] || "" },
    priority: { isVisible: false, selected: PRIORITY[0] || "" },
  };

  const [deleteModal, setDeleteModal] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isEndDateVisible, setIsEndDateVisibility] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [dropdowns, setDropdowns] = useState(initialDropdownState);
  const [newTaskSummary, setNewTaskSummary] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [selectedAssignee, setSelectedAssignee] = useState("");

  const assigneeMembers = props.allMembers?.map((item) => ({
    key: item.memberId,
    value: `${item.email}`,
  }));

  const startDateFormat = startTime
    ? timeFormat(startTime)
    : props.taskDetails?.startDate.replace("T", ", ");

  const endDateFormat = endTime
    ? timeFormat(endTime)
    : props.taskDetails?.endDate.replace("T", ", ");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const showEndDatePicker = () => {
    setIsEndDateVisibility(true);
  };
  const hideEndDatePicker = () => {
    setIsEndDateVisibility(false);
  };

  const startTimeConfirm = (date) => {
    setStartTime(date);
    hideDatePicker();
  };

  const endTimeConfirm = (date) => {
    setEndTime(date);
    hideEndDatePicker();
  };

  const toggleDropdown = (name) => {
    setDropdowns((prevState) => ({
      ...initialDropdownState,
      [name]: { ...prevState[name], isVisible: !prevState[name].isVisible },
    }));
  };

  const selectItem = (name, item) => {
    setDropdowns((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name], isVisible: false, selected: item },
    }));
  };

  const onSelectedAssignee = (selectedUser) => {
    setSelectedAssignee(selectedUser);
  };

  const openDeleteModal = () => {
    setDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const deleteTaskHandler = async () => {
    const resp = await dispatch(
      deleteTask(props.taskDetails.teamId, props.taskDetails.taskId)
    );
    if (resp) {
      closeDeleteModal();
      props.closeModal();
      props.navigation.goBack();
    }
  };

  const editTaskHandler = async () => {
    const taskInfo = props.taskDetails;
    let assigneeUser = users.filter((user) => user.email === selectedAssignee);
    assigneeUser =
      Array.isArray(assigneeUser) && assigneeUser.length > 0
        ? createUserObject(assigneeUser[0])
        : null;

    const taskData = {
      taskId: taskInfo.taskId,
      teamId: taskInfo.teamId,
      title: taskInfo.title,
      summary: newTaskSummary || taskInfo.summary,
      description: newTaskDesc || taskInfo.description,
      status: dropdowns.status.selected,
      priority: dropdowns.priority.selected,
      startDate: startTime?.toISOString() || taskInfo.startDate,
      endDate: endTime?.toISOString() || taskInfo.endDate,
      assignee: assigneeUser,
    };
    const resp = await dispatch(editTask(taskInfo.teamId, taskData));
    if (resp) {
      props.closeModal();
      props.navigation.goBack();
    }
  };

  // console.log(props.taskDetails);

  return (
    <Modal animationType="slide" style={styles.modal} visible={props.showModal}>
      <ConfirmModal
        showModal={deleteModal}
        closeModal={closeDeleteModal}
        title={"Are you sure you want to delete this task?"}
        confirmBtn={deleteTaskHandler}
      />
      <View style={styles.modalView}>
        <ScrollView>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={props.closeModal}>
                <Image
                  source={require("../../assets/close.png")}
                  style={styles.closeImg}
                />
              </TouchableOpacity>
              <Ionicons
                name="trash-outline"
                size={24}
                color="black"
                onPress={openDeleteModal}
              />
            </View>

            {/* TODO: make title and description can be edit */}
            <Text style={styles.taskNum}>{props.taskDetails?.title}</Text>
            <TextInput
              style={styles.taskSummary}
              multiline
              defaultValue={props.taskDetails?.summary}
              onChangeText={(text) => {
                setNewTaskSummary(text);
              }}
            />

            <Text style={styles.desc}>Description:</Text>
            <View style={styles.descContent}>
              <TextInput
                style={styles.descText}
                multiline
                defaultValue={props.taskDetails?.description}
                onChangeText={(text) => {
                  setNewTaskDesc(text);
                }}
              />
            </View>

            <View style={styles.dropdownContainer}>
              <Dropdown
                isVisible={dropdowns.status.isVisible}
                toggleHandler={() => toggleDropdown("status")}
                items={STATUS}
                selectItemHandler={(item) => selectItem("status", item)}
                label="Status"
                selectedItem={dropdowns.status.selected}
                labelMarginRight={-42}
              />
            </View>
            <View style={styles.dropdownContainer}>
              <Dropdown
                isVisible={dropdowns.priority.isVisible}
                toggleHandler={() => toggleDropdown("priority")}
                items={PRIORITY}
                selectItemHandler={(item) => selectItem("priority", item)}
                label="Priority"
                selectedItem={dropdowns.priority.selected}
                labelMarginRight={-46}
              />
            </View>

            {/* TODO: show for team leader only => to get it compare between curUser.email and team.teamLeader.email */}
            <Text style={[styles.desc, { marginBottom: 6 }]}>Assignee:</Text>
            <SelectList
              save="value"
              placeholder="Select Assignee "
              data={assigneeMembers}
              setSelected={onSelectedAssignee}
              defaultOption={{
                key: props.taskDetails?.assignee?.memberId || null,
                value: props.taskDetails?.assignee?.email || null,
              }}
            />

            <Text style={styles.desc}>Start date:</Text>
            <View style={styles.timeContent}>
              <Text style={styles.descValue}>{startDateFormat}</Text>
              <TouchableOpacity onPress={showDatePicker}>
                <Image
                  source={require("../../assets/calendar.png")}
                  style={styles.calendarImg}
                />
              </TouchableOpacity>
            </View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="datetime"
              onConfirm={startTimeConfirm}
              onCancel={hideDatePicker}
            />

            <Text style={styles.desc}>End date:</Text>
            <View style={styles.timeContent}>
              <Text style={styles.descValue}>{endDateFormat}</Text>
              <TouchableOpacity onPress={showEndDatePicker}>
                <Image
                  source={require("../../assets/calendar.png")}
                  style={styles.calendarImg}
                />
              </TouchableOpacity>
            </View>
            <DateTimePickerModal
              isVisible={isEndDateVisible}
              mode="datetime"
              onConfirm={endTimeConfirm}
              onCancel={hideEndDatePicker}
            />

            {/* <Text style={styles.desc}>Comments:</Text> */}
          </View>
        </ScrollView>
        <View style={styles.buttons}>
          <Button
            onPress={editTaskHandler}
            btnStyle={[styles.btnStyle, styles.activeBtnStyle]}
          >
            {isLoading ? <DotPulse /> : "Save"}
          </Button>
          <Button
            onPress={props.closeModal}
            btnStyle={styles.btnStyle}
            textColor={Colors.lightBlack}
          >
            {"Cancel"}
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    margin: 0,
  },
  modalView: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.white,
  },
  scrollStyle: {
    width: "100%",
    height: "100%",
  },
  modalContent: {
    width: "100%",
    borderRadius: 4,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  closeImg: {
    width: 20,
    height: 20,
  },
  taskNum: {
    marginVertical: 8,
    fontSize: 12,
  },
  taskSummary: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  desc: {
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 2,
  },
  timeContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: -4,
  },
  descContent: {
    justifyContent: "center",
    padding: 12,
    marginTop: 4,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: 8,
  },
  descText: {
    marginLeft: 2,
    lineHeight: 20,
  },
  dropdownContainer: {
    width: "112%",
    alignSelf: "center",
  },
  descValue: {
    marginLeft: 4,
  },
  calendarImg: {
    width: 32,
    height: 32,
  },
  buttons: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  btnStyle: {
    width: "40%",
    backgroundColor: Colors.lightGrey,
    marginTop: 36,
    marginHorizontal: 12,
  },
  activeBtnStyle: {
    backgroundColor: Colors.primary,
  },
});

export default TaskDetailsModal;
