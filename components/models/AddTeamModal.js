import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-native-modal";

import { Colors } from "../../constants/config";
import Input from "../custom/Input";
import Button from "../custom/Button";
import DotPulse from "../custom/DotPulse";
import { addTeam } from "../../store/actions/Tasks";

const AddTeamModal = (props) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.ui.isLoading);

  const [teamName, setTeamName] = useState("");
  const [teamDesc, setTeamDesc] = useState("");
  const [synonym, setSynonym] = useState("");

  const addTeamHandler = async () => {
    try {
      const teamData = {
        name: teamName,
        description: teamDesc,
        signature: synonym,
      };
      const resp = await dispatch(addTeam(teamData));
      clearInputs();
      resp && props.navigation.goBack();
    } catch (err) {
      console.log("addTeamHandler ERROR ==>", err);
    }
  };

  const clearInputs = () => {
    setTeamName("");
    setTeamDesc("");
    setSynonym("");
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
              label="Team name"
              value={teamName}
              onUpdateValue={(text) => setTeamName(text)}
              borderColor={Colors.lightGrey}
            />
          </View>
          <View style={styles.inputWidth}>
            <Input
              label="Team Description"
              value={teamDesc}
              onUpdateValue={(text) => setTeamDesc(text)}
              borderColor={Colors.lightGrey}
            />
          </View>
          <View style={styles.inputWidth}>
            <Input
              label="Team Key"
              value={synonym}
              onUpdateValue={(text) => setSynonym(text)}
              borderColor={Colors.lightGrey}
              multiline={true}
              maxLength={5}
            />
          </View>

          <View style={styles.buttons}>
            <Button
              onPress={addTeamHandler}
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
    width: "90%",
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
  },
});

export default AddTeamModal;
