import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";

import { Colors, PRIORITY, STATUS } from "../../constants/config";
import ConfirmModal from "./ConfirmModal";
import { deleteTask } from "../../store/actions/Tasks";
import Dropdown from "../custom/Dropdown";
import Button from "../custom/Button";
import DotPulse from "../custom/DotPulse";

const TaskDetailsModal = (props) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.ui.isLoading);

  const initialDropdownState = {
    status: { isVisible: false, selected: STATUS[0] || "" },
    priority: { isVisible: false, selected: PRIORITY[0] || "" },
  };

  const [deleteModal, setDeleteModal] = useState(false);
  const [dropdowns, setDropdowns] = useState(initialDropdownState);

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
    }
  };

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
            <Text style={styles.taskSummary}>{props.taskDetails?.summary}</Text>

            <Text style={styles.desc}>Description:</Text>
            <View style={styles.descContent}>
              <Text style={styles.descText}>
                {props.taskDetails?.description}
              </Text>
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

            {/* TODO: make start and end times can be edit with icons */}
            <Text style={styles.desc}>Start date:</Text>
            <Text style={styles.descValue}>
              {props.taskDetails?.startDate.replace("T", ", ")}
            </Text>
            <Text style={styles.desc}>End date:</Text>
            <Text style={styles.descValue}>
              {props.taskDetails?.endDate.replace("T", ", ")}
            </Text>

            <Text style={styles.desc}>Comments:</Text>
          </View>
        </ScrollView>
        <View style={styles.buttons}>
          <Button
            // onPress={addTaskHandler}
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
    marginVertical: 12,
    fontSize: 12,
  },
  taskSummary: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  desc: {
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 2,
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
    alignSelf: "center" 
  },
  descValue: {
    marginLeft: 4,
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
