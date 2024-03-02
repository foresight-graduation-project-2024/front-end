import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { Colors, shadowStyle } from "../../constants/config";
import DeActivateUserModal from "../models/DeActivateUserModal";
import ChangePasswordModal from "../models/ChangePasswordModal";
import Button from "../custom/Button";

const UserDetails = ({ route, navigation }) => {
  const user = route.params?.user;
  const [isActive, setIsActive] = useState(user.enabled);
  const [showDeActivate, setShowDeActivate] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const activateHandler = () => {
    setIsActive((prev) => !prev);
    setShowDeActivate((prev) => !prev);
  };

  const navToAddEditUser = () => {
    navigation.navigate("AddEditUser", {
      user,
      isEditing: true,
    });
  };

  const closeDeActivateModal = () => {
    setShowDeActivate((prev) => !prev);
    navigation.goBack();
  };

  const changePasswordHandler = () => {
    setShowChangePassword((prev) => !prev);
  }
  const closeChangePassword = () => {
    setShowChangePassword((prev) => !prev);
  }

  return (
    <View style={styles.container}>
      <DeActivateUserModal
        showModal={showDeActivate}
        user={user}
        closeModal={closeDeActivateModal}
      />
      <ChangePasswordModal 
        showModal={showChangePassword}
        id={user.id}
        closeModal={closeChangePassword}
      />
      <View style={[styles.userInformation, shadowStyle.shadow_md]}>
        <Text style={styles.fullName}>
          {user.firstname} {user.lastname}
        </Text>
        <Text style={styles.emailStyle}>{user.email}</Text>
        <Text>{user.role}</Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.btnContent} onPress={navToAddEditUser}>
          <Text style={styles.btnText}>{"Edit User"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnContent} onPress={changePasswordHandler}>
          <Text style={styles.btnText}>{"Change Password"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btnContent,
            { backgroundColor: user.enabled ? Colors.error : Colors.primary },
          ]}
          onPress={activateHandler}
        >
          <Text style={styles.btnText}>
            {user.enabled ? "Deactivate" : "Activate"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 32,
  },
  userInformation: {
    width: "92%",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 72,
  },
  fullName: {
    fontSize: 18,
    color: Colors.black,
    fontWeight: "600",
  },
  emailStyle: {
    marginTop: 4,
    marginBottom: 16,
  },
  buttons: {
    width: "92%", 
    alignSelf: "center", 
    justifyContent: "flex-end"
  },
  btnContent: {
    // width: "92%",
    alignItems: "center",
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  btnText: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: "400",
  },
});

export default UserDetails;
