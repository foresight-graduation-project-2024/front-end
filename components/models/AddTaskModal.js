import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-native-modal";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { addTask } from "../../store/actions/Tasks";
import { Colors, PRIORITY, STATUS } from "../../constants/config";
import { timeFormat } from "../../constants/Utility";
import Input from "../custom/Input";
import Dropdown from "../custom/Dropdown";
import DotPulse from "../custom/DotPulse";
import Button from "../custom/Button";

const AddTaskModal = ({
  showModal = false,
  closeModal = () => {},
  teamId = null,
  signature = '',
  navigation = null,
}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.ui.isLoading);

  const initialDropdownState = {
    status: { isVisible: false, selected: STATUS[0] || "" },
    priority: { isVisible: false, selected: PRIORITY[0] || "" },
  };

  const [dropdowns, setDropdowns] = useState(initialDropdownState);
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isEndDateVisible, setIsEndDateVisibility] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const startDateFormat = startTime
    ? timeFormat(startTime)
    : "YYYY-MMM-DD, HH-MM";

  const endDateFormat = endTime
    ? timeFormat(endTime)
    : "YYYY-MMM-DD, HH-MM";

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

  const addTaskHandler = async () => {
    const taskData = {
      title: signature,
      summary,
      description,
      status: dropdowns.status.selected,
      priority: dropdowns.priority.selected,
      startDate: startTime.toISOString(),
      endDate: endTime.toISOString(),
    };
    // console.log(teamId);
    // console.log(taskData);
    const resp = await dispatch(addTask(teamId, taskData));
    resp && navigation.goBack();
    clearInputs();
  };

  const clearInputs = () => {
    setSummary("");
    setDescription("");
    setStartTime(null);
    setEndTime(null);
  };

  const checkValidation = () => {
    return (
      summary.trim() !== "" &&
      description.trim() !== "" &&
      dropdowns.status.selected &&
      dropdowns.priority.selected &&
      !!startTime &&
      !!endTime
    );
  }

  return (
    <Modal
      animationType="slide"
      style={styles.modal}
      visible={showModal}
      onRequestClose={closeModal}
      onBackdropPress={closeModal}
    >
      <View style={styles.modalView}>
        <ScrollView style={styles.scrolling}>
          <View style={styles.modalContent}>
            <View style={styles.inputWidth}>
              <Input
                label="Summary"
                value={summary}
                onUpdateValue={(text) => setSummary(text)}
                borderColor={Colors.lightGrey}
              />
            </View>
            <View style={styles.inputWidth}>
              <Input
                label="Description"
                value={description}
                onUpdateValue={(text) => setDescription(text)}
                borderColor={Colors.lightGrey}
                multiline={true}
                maxLength={999}
              />
            </View>

            <Dropdown
              isVisible={dropdowns.status.isVisible}
              toggleHandler={() => toggleDropdown("status")}
              items={STATUS}
              selectItemHandler={(item) => selectItem("status", item)}
              label="Status"
              selectedItem={dropdowns.status.selected}
              labelMarginRight={-42}
            />

            <Dropdown
              isVisible={dropdowns.priority.isVisible}
              toggleHandler={() => toggleDropdown("priority")}
              items={PRIORITY}
              selectItemHandler={(item) => selectItem("priority", item)}
              label="Priority"
              selectedItem={dropdowns.priority.selected}
              labelMarginRight={-46}
            />

            <View style={styles.inputWidth}>
              <Text style={styles.label}>Start time</Text>
              <View style={styles.dateField}>
                <Text>{startDateFormat}</Text>
                <TouchableOpacity onPress={showDatePicker}>
                  <Image
                    source={require("../../assets/calendar.png")}
                    style={styles.calendarImg}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="datetime"
              onConfirm={startTimeConfirm}
              onCancel={hideDatePicker}
            />

            <View style={styles.inputWidth}>
              <Text style={styles.label}>End time</Text>
              <View style={styles.dateField}>
                <Text>{endDateFormat}</Text>
                <TouchableOpacity onPress={showEndDatePicker}>
                  <Image
                    source={require("../../assets/calendar.png")}
                    style={styles.calendarImg}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <DateTimePickerModal
              isVisible={isEndDateVisible}
              mode="datetime"
              onConfirm={endTimeConfirm}
              onCancel={hideEndDatePicker}
            />

            <View style={styles.buttons}>
              <Button
                onPress={addTaskHandler}
                btnStyle={[styles.btnStyle, {
                  backgroundColor: checkValidation() ? Colors.primary : Colors.dammed,
                }]}
                textColor={checkValidation() ? Colors.white : Colors.lightBlack}
                disabled={!checkValidation()}
              >
                {isLoading ? <DotPulse /> : "Add"}
              </Button>
              <Button
                onPress={closeModal}
                btnStyle={styles.btnStyle}
                textColor={Colors.lightBlack}
              >
                {"Cancel"}
              </Button>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "rgba(0,0,0,0.5)",
    margin: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    width: "96%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  scrolling: {
    width: "100%",
  },
  modalContent: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingVertical: 16,
  },
  inputWidth: {
    width: "90%",
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
  },
  dateField: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: 8,
  },
  calendarImg: {
    width: 32,
    height: 32,
  },
  buttons: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  btnStyle: {
    width: "40%",
    backgroundColor: Colors.lightGrey,
    marginTop: 36,
    marginHorizontal: 12,
  },
});

export default AddTaskModal;
