import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../constants/config";
import Button from "../custom/Button";
import DotPulse from "../custom/DotPulse";
import ConfirmModal from "./ConfirmModal";
import { addMembers, deleteMember } from "../../store/actions/Tasks";
import { createUserObject } from "../../constants/Utility";

const MembersModal = (props) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const isLoading = useSelector((state) => state.ui.isLoading);

  const [selectedMembers, setSelectedMembers] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [memberId, setMemberId] = useState(null);
  const [membersError, setMembersError] = useState(false);

  const teamLeaderData = users
    .filter(
      (user) =>
        user.role !== "ADMIN" &&
        user.role !== "TECHNICAL_MANAGER" &&
        user.enabled !== false &&
        user.email !== props.teamLeader
    )
    .map((item) => ({
      key: item.id,
      value: `${item.email}`,
    }));

  const allEmails = props.allMembers?.map((member) => member.email);
  const membersData = teamLeaderData.filter(
    (user) => !allEmails?.includes(user.value)
  );

  const onSelectedMembers = (selectedUsers) => {
    setSelectedMembers(selectedUsers);
  };

  const openDeleteModal = (memberId) => {
    setDeleteModal(true);
    setMemberId(memberId);
  };
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const addMemberHandler = async () => {
    let selectedUsers = users.filter((user) =>
      selectedMembers.includes(user.email)
    );
    const members = selectedUsers.map(createUserObject);
    const resp = await dispatch(addMembers(props.teamId, members));
    resp && props.navigation.goBack();
  };

  const deleteMemberHandler = async () => {
    const resp = await dispatch(deleteMember(props.teamId, memberId));
    closeDeleteModal();
    if (!resp) setMembersError(true);
    else {
      props.closeModal();
      props.navigation.goBack();
    }
  };

  const cancelHandler = () => {
    props.closeModal();
    setMembersError(false);
  };

  return (
    <Modal
      animationType="slide"
      style={styles.modal}
      visible={props.showModal}
      onRequestClose={props.closeModal}
      onBackdropPress={props.closeModal}
    >
      <ConfirmModal
        showModal={deleteModal}
        closeModal={closeDeleteModal}
        title={"Are you sure you want to delete this member?"}
        confirmBtn={deleteMemberHandler}
      />
      <View style={styles.modalView}>
        <ScrollView style={styles.scrolling}>
          <View style={styles.modalContent}>
            <MultipleSelectList
              data={membersData}
              maxHeight={200}
              label="Members:"
              save="value"
              setSelected={onSelectedMembers}
              placeholder="Select members "
            />

            <Text style={styles.mainText}>Team members: </Text>
            {props.allMembers && props.allMembers.length > 0 ? (
              props.allMembers.map((data, index) => (
                <View key={index} style={styles.assigneeContainer}>
                  <Text style={styles.assigneeText}>
                    {"- "}
                    {data.firstname} {data.lastname}
                  </Text>
                  <Ionicons
                    name="trash-outline"
                    size={22}
                    color={Colors.error}
                    onPress={() => openDeleteModal(data.memberId)}
                  />
                </View>
              ))
            ) : (
              <>
                <Text style={styles.noMembers}>No member exist!</Text>
                <Text style={[styles.noMembers, { marginTop: 0 }]}>
                  Please add a member!
                </Text>
              </>
            )}

            {membersError && (
              <Text style={styles.validation}>
                The number of members in the team can't be less than 1
              </Text>
            )}

            <View style={styles.buttons}>
              <Button
                onPress={addMemberHandler}
                btnStyle={[styles.btnStyle, styles.activeBtnStyle]}
              >
                {isLoading ? <DotPulse /> : "Save"}
              </Button>
              <Button
                onPress={cancelHandler}
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
    width: "94%",
    justifyContent: "center",
    alignItems: "center",
  },
  scrolling: {
    width: "100%",
  },
  modalContent: {
    width: "100%",
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  mainText: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
  },
  assigneeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
    marginHorizontal: 8,
  },
  assigneeText: {
    color: Colors.black,
  },
  noMembers: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 18,
  },
  validation: {
    textAlign: "center",
    color: Colors.error,
    marginTop: 24,
    paddingHorizontal: 12,
    fontSize: 14,
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

export default MembersModal;
