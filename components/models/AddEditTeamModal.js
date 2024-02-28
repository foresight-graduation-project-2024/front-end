import React, { useCallback, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-native-modal";
import {
  MultipleSelectList,
  SelectList,
} from "react-native-dropdown-select-list";

import { Colors } from "../../constants/config";
import Input from "../custom/Input";
import Button from "../custom/Button";
import DotPulse from "../custom/DotPulse";
import { addTeam, editTeamDetails } from "../../store/actions/Tasks";

const AddEditTeamModal = (props) => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.ui.isLoading);
  const users = useSelector((state) => state.user.users);
  const selectUsers = users
    .filter(
      (user) => user.role !== "ADMIN" && user.role !== "TECHNICAL_MANAGER"
    )
    .map((item) => ({
      key: item.id,
      value: `${item.firstname} ${item.lastname}`,
    }));

  const isEditing = props.isEditing;

  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedTeamLeader, setSelectedTeamLeader] = useState();
  const [teamDetails, setTeamDetails] = useState({
    teamName: isEditing ? props.team.name : "",
    teamDesc: isEditing ? props.team.description : "",
    synonym: isEditing ? props.team.signature : "",
  });

  const createUserObject = (user) => ({
    memberId: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
  });

  const addTeamHandler = async () => {
    try {
      let teamLeader = users.filter(
        (user) => user.firstname === selectedTeamLeader.split(" ")[0]
      );
      teamLeader = createUserObject(teamLeader[0])

      const selectedFirstNames = selectedMembers.map(
        (name) => name.split(" ")[0]
      );
      let selectedUsers = users.filter((user) =>
        selectedFirstNames.includes(user.firstname)
      );
      const members = selectedUsers.map(createUserObject);

      const teamData = {
        name: teamDetails.teamName,
        description: teamDetails.teamDesc,
        signature: teamDetails.synonym,
        teamLeader: teamLeader,
        members: members,
      };
      const resp = await dispatch(addTeam(teamData));
      clearInputs();
      resp && props.closeModal();
    } catch (err) {
      console.log("addTeamHandler ERROR ==>", err);
    }
  };

  const editTeamHandler = async () => {
    const teamData = {
      id: props.team.teamId,
      name: teamDetails.teamName,
      description: teamDetails.teamDesc,
      signature: teamDetails.synonym,
    };
    const resp = await dispatch(editTeamDetails(teamData));
    if (resp) {
      clearInputs();
      props.navigation.goBack();
    }
  };

  const clearInputs = () => {
    setTeamDetails((prevDetails) => ({
      ...prevDetails,
      teamName: "",
      teamDesc: "",
      synonym: "",
    }));
    setSelectedTeamLeader();
    setSelectedMembers([]);
  };

  const changeTeamDetailsHandler = useCallback((name, value) => {
    setTeamDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  }, []);

  const onSelectedMembers = (selectedUser) => {
    setSelectedMembers(selectedUser);
  };
  const onSelectedTeamLeader = (selectedUser) => {
    setSelectedTeamLeader(selectedUser);
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
              value={teamDetails.teamName}
              onUpdateValue={(value) =>
                changeTeamDetailsHandler("teamName", value)
              }
              borderColor={Colors.lightGrey}
            />
          </View>
          <View style={styles.inputWidth}>
            <Input
              label="Team Description"
              value={teamDetails.teamDesc}
              onUpdateValue={(value) =>
                changeTeamDetailsHandler("teamDesc", value)
              }
              borderColor={Colors.lightGrey}
            />
          </View>
          <View style={styles.inputWidth}>
            <Input
              label="Team Key"
              value={teamDetails.synonym}
              onUpdateValue={(value) =>
                changeTeamDetailsHandler("synonym", value)
              }
              borderColor={Colors.lightGrey}
              multiline={true}
              maxLength={5}
            />
          </View>

          {/* TODO: add input fields to choose teamLeader and members */}
          <View style={styles.members}>
            <SelectList
              save="value"
              placeholder="Select Team Leader "
              data={selectUsers}
              setSelected={onSelectedTeamLeader}
            />

            <MultipleSelectList
              data={selectUsers}
              maxHeight={200}
              label="Members:"
              save="value"
              setSelected={onSelectedMembers}
              placeholder="Select members "
            />
          </View>

          <View style={styles.buttons}>
            <Button
              onPress={isEditing ? editTeamHandler : addTeamHandler}
              btnStyle={[styles.btnStyle, styles.activeBtnStyle]}
            >
              {isLoading ? <DotPulse /> : isEditing ? "Save" : "Add"}
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
  members: {
    width: "90%",
    gap: 12,
    marginTop: 12,
  },
  searchStyle: {
    marginTop: 12,
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

export default AddEditTeamModal;
