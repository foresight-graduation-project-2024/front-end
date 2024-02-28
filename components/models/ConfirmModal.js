import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";

import { Colors } from "../../constants/config";
import Button from "../custom/Button";
import { useSelector } from 'react-redux';
import DotPulse from "../custom/DotPulse";

const ConfirmModal = (props) => {
  const isLoading = useSelector((state) => state.ui.isLoading);

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
          <View style={styles.titleStyle}>
            <Text style={styles.textTitleStyle}>{props.title}</Text>
          </View>
          <View style={styles.buttons}>
            <Button
              onPress={props.confirmBtn}
              btnStyle={styles.btnStyle}
              textColor={Colors.black}
            >
              {isLoading ? <DotPulse /> : "Confirm"}
            </Button>
            <Button 
              onPress={props.closeModal} 
              btnStyle={{ backgroundColor: Colors.primary }}
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
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "100%",
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 12,
  },
  titleStyle: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  textTitleStyle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: Colors.black,
    marginHorizontal: 10,
    lineHeight: 25,
  },
  buttons: {
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  btnStyle: {
    backgroundColor: Colors.dammed,
    marginBottom: 8,
  },
});

export default ConfirmModal;
