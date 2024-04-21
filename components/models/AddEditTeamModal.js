import React, { useCallback, useState } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
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
import { createUserObject } from "../../constants/Utility";

const AddEditTeamModal = (props) => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.ui.isLoading);
  const users = useSelector((state) => state.user.users);

  const isEditing = props.isEditing;

  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedTeamLeader, setSelectedTeamLeader] = useState("");
  const [teamDetails, setTeamDetails] = useState({
    teamName: isEditing ? props.team.name : "",
    teamDesc: isEditing ? props.team.description : "",
    synonym: isEditing ? props.team.signature : "",
  });

  const teamLeaderData = users
    .filter(
      (user) =>
        user.role !== "ADMIN" &&
        user.role !== "TECHNICAL_MANAGER" &&
        user.enabled !== false
    )
    .map((item) => ({
      key: item.id,
      value: `${item.email}`,
    }));
  const membersData = teamLeaderData.filter(
    (user) => user.value !== selectedTeamLeader
  );

  const addTeamHandler = async () => {
    try {
      let teamLeader = users.filter(
        (user) => user.email === selectedTeamLeader
      );
      teamLeader = createUserObject(teamLeader[0]);

      let selectedUsers = users.filter((user) =>
        selectedMembers.includes(user.email)
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
    let teamLeader = users.filter((user) => user.email === selectedTeamLeader);
    teamLeader =
      Array.isArray(teamLeader) &&
      teamLeader.length > 0 &&
      createUserObject(teamLeader[0]);

    const teamData = {
      teamId: props.team.teamId,
      signature: props.team.signature,
      name: teamDetails.teamName,
      description: teamDetails.teamDesc,
      teamLeader: teamLeader ? teamLeader : props.team?.teamLeader,
    };
    const resp = await dispatch(editTeamDetails(teamData));
    resp && props.navigation.goBack();
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

  const checkValidation = () => {
    return (
      teamDetails.teamName.trim() !== "" &&
      teamDetails.teamDesc.trim() !== "" &&
      teamDetails.synonym.trim() !== "" &&
      selectedTeamLeader?.length > 0 &&
      (isEditing || selectedMembers?.length > 0)
    );
  }

  return (
    <Modal
      animationType="slide"
      style={styles.modal}
      visible={props.showModal}
      onRequestClose={props.closeModal}
      onBackdropPress={props.closeModal}
    >
      <View style={styles.modalView}>
        <ScrollView style={styles.scrolling}>
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
            {!isEditing && (
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
            )}

            <View style={styles.members}>
              {isEditing && (
                <Text>Team Leader:</Text>
              )}
              <SelectList
                save="value"
                placeholder="Select Team Leader "
                data={teamLeaderData}
                setSelected={onSelectedTeamLeader}
                defaultOption={{
                  key: isEditing && props.team?.teamLeader.memberId,
                  value: isEditing && props.team?.teamLeader.email,
                }}
              />

              {!isEditing && (
                <MultipleSelectList
                  data={membersData}
                  maxHeight={200}
                  label="Members:"
                  save="value"
                  setSelected={onSelectedMembers}
                  placeholder="Select members "
                />
              )}
            </View>

            <View style={styles.buttons}>
              <Button
                onPress={isEditing ? editTeamHandler : addTeamHandler}
                btnStyle={[styles.btnStyle, {
                  backgroundColor: checkValidation() ? Colors.primary : Colors.dammed,
                }]}
                textColor={checkValidation() ? Colors.white : Colors.lightBlack}
                disabled={!checkValidation()}
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
  scrolling: {
    width: "100%",
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
});

export default AddEditTeamModal;
