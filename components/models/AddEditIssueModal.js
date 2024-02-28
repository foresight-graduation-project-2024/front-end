import React, { useState } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import { useSelector } from 'react-redux';
import Modal from "react-native-modal";

import { Colors, PRIORITY, STATUS } from "../../constants/config";
import Input from "../custom/Input";
import Dropdown from "../custom/Dropdown";
import DotPulse from "../custom/DotPulse";
import Button from "../custom/Button";

const AddEditIssueModal = (props) => {
  const isLoading = useSelector(state => state.ui.isLoading);

  const initialDropdownState = {
    status: { isVisible: false, selected: STATUS[0] || "" },
    priority: { isVisible: false, selected: PRIORITY[0] || "" },
  };

  const [dropdowns, setDropdowns] = useState(initialDropdownState);
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");

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

          {/* TODO: Add startDate => could start after week, DeadLine (endData) */}

          <View style={styles.buttons}>
            <Button
              onPress={() => {}}
              btnStyle={[styles.btnStyle, styles.activeBtnStyle]}
              >
              {isLoading ? <DotPulse /> : "Add"}
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

export default AddEditIssueModal;
