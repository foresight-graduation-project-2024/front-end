import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  TouchableOpacity,
} from "react-native";

import { Colors, passwordRegex } from "../../constants/config";
import Input from "../custom/Input";
import Button from "../custom/Button";
import DotPulse from "../custom/DotPulse";
import { changePassword } from "../../store/actions/Users";

const ChangePasswordModal = (props) => {
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const isLoading = useSelector((state) => state.ui.isLoading);

  const changePasswordHandler = async () => {
    const strongPassword = passwordRegex.test(newPassword);
    const newPassData = {newPassword}
    if (strongPassword) {
      const resp = await dispatch(changePassword(props.id, newPassData))
      if(resp) props.closeModal();
    } else {
      setPasswordValid(false);
    }
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
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={props.closeModal}>
              <Image
                source={require("../../assets/close.png")}
                style={styles.closeIcon}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>{"Change Password"}</Text>
          </View>
          <Input
            value={newPassword}
            onUpdateValue={(value) => setNewPassword(value)}
            borderColor={Colors.lightGrey}
          />
          {!passwordValid && (
            <Text style={styles.validation}>
              Password must contains numbers, charters, and symbols
            </Text>
          )}
          <Button
            onPress={changePasswordHandler}
            btnStyle={styles.btnStyle}
          >
            {isLoading ? <DotPulse /> : "Save"}
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    height: "26%",
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
    padding: 24,
  },
  modalHeader: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "500",
    color: Colors.black,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  validation: {
    color: Colors.error,
    marginBottom: 6,
    fontSize: 12,
  },
  btnStyle: {
    backgroundColor: Colors.primary,
    marginTop: 6
  }
});

export default ChangePasswordModal;
