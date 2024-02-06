import React from "react";
import { StyleSheet, Text, View, Modal } from "react-native";
import { Colors } from "../../constants/config";
import Button from "../custom/Button";
import { useDispatch } from "react-redux";
import { activateUser, deactivateUser } from "../../store/actions/Users";

const DeActivateUserModal = (props) => {
  const dispatch = useDispatch();

  const deActivateHandler = () => {
    dispatch(deactivateUser(props.user.id));
    props.closeModal();
  };

  const activateHandler = () => {
    dispatch(activateUser(props.user.id));
    props.closeModal();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.showModal}
      onRequestClose={props.closeModal}
    >
      <View style={styles.modalView}>
        <View style={styles.modalContent}>
          <View style={styles.content}>
            <Text style={styles.textTitleStyle}>
              {`Are you sure you want to ${
                props.user.enabled ? "deactivate" : "activate"
              } this account?`}
            </Text>
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              onPress={props.user.enabled ? deActivateHandler : activateHandler}
              backgroundColor={
                props.user.enabled ? Colors.error : Colors.primary
              }
            >
              {props.user.enabled ? "Deactivate" : "Activate"}
            </Button>
            <Button
              onPress={props.closeModal}
              backgroundColor={Colors.dammed}
              color={Colors.black}
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
  modalView: {
    height: "25%",
    width: "100%",
    alignSelf: "center",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
  },
  modalContent: {
    width: "100%",
    backgroundColor: Colors.white,
    borderRadius: 24,
    paddingVertical: 24,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  textTitleStyle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    color: Colors.black,
    marginHorizontal: 25,
    marginBottom: 16,
  },
  buttonsContainer: {
    width: "80%",
    alignSelf: "center",
    flexDirection: "column",
    gap: 6,
  },
});

export default DeActivateUserModal;
