import React, { useState } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import Modal from "react-native-modal";
import { Colors } from "../../constants/config";
import Input from "../custom/Input";
import Dropdown from "../custom/Dropdown";
import DotPulse from "../custom/DotPulse";
import Button from "../custom/Button";
import { useSelector } from 'react-redux';

// TODO: for edit also
const AddIssueModal = (props) => {
  const isLoading = useSelector(state => state.ui.isLoading);

  const [dropdowns, setDropdowns] = useState(initialDropdownState);
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");

  const initialDropdownState = {
    team: { isVisible: false, selected: props.teams[0] || "" },
    status: { isVisible: false, selected: props.teams[0] || "" },
    assignee: { isVisible: false, selected: props.members[0] || "" },
    label: { isVisible: false, selected: props.labels[0] || "" },
  };

  const STATUS = ["TODO", "DONE", "INPROGRESS"];

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

  return (
    <Modal
      animationType="slide"
      style={styles.modal}
      visible={props.showModal}
      onRequestClose={props.closeModal}
      onBackdropPress={props.closeModal}
    >
      <View style={styles.modalView}>
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

          {/* <Dropdown
            isVisible={dropdowns.team.isVisible}
            toggleHandler={() => toggleDropdown("team")}
            items={props.teams}
            selectItemHandler={(item) => selectItem("team", item)}
            label="Team"
            selectedItem={dropdowns.team?.selected}
            labelMarginRight={-36}
          /> */}

          {/* TODO STATUS WAITING -> ALWAYS */}
          {/* <Dropdown
            isVisible={dropdowns.status.isVisible}
            toggleHandler={() => toggleDropdown("status")}
            items={STATUS}
            selectItemHandler={(item) => selectItem("status", item)}
            label="Status"
            selectedItem={dropdowns.status.selected}
            labelMarginRight={-42}
          /> */}

          {/* <Dropdown
            isVisible={dropdowns.assignee.isVisible}
            toggleHandler={() => toggleDropdown("assignee")}
            items={props.members}
            selectItemHandler={(item) => selectItem("assignee", item)}
            label="Assignee"
            selectedItem={dropdowns.assignee.selected}
            labelMarginRight={-58}
          /> */}

          {/* <Dropdown
            isVisible={dropdowns.label.isVisible}
            toggleHandler={() => toggleDropdown("label")}
            items={props.labels}
            selectItemHandler={(item) => selectItem("label", item)}
            label="Label"
            selectedItem={dropdowns.label.selected}
            labelMarginRight={-38}
          /> */}

          {/* TODO: Add start date, DeadLine */}

          <View style={styles.buttons}>
            <Button
              onPress={() => {}}
              btnStyle={[styles.btnStyle, styles.activeBtnStyle]}
              >
              {isLoading ? <DotPulse /> : "Add"}
            </Button>
            <Button
              onPress={() => {}}
              btnStyle={styles.btnStyle}
              textColor={Colors.lightBlack}            
            >
              {"Cancel"}
            </Button>
          </View>

        </View>
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
  modalContent: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingVertical: 16,
  },
  inputWidth: { 
    width: "90%" 
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
  activeBtnStyle: {
    backgroundColor: Colors.primary,
  }
});

export default AddIssueModal;
