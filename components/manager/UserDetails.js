import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Colors, shadowStyle } from "../../constants/config";
import DeActivateUserModal from "../models/DeActivateUserModal";
import ChangePasswordModal from "../models/ChangePasswordModal";
import TeamCard from "../taskManager/TeamCard";
import IssueCard from "../taskManager/IssueCard";

const UserDetails = ({ route, navigation }) => {
  const user = route.params?.user;
  const userTeams = route.params?.userTeams;
  const userTasks = route.params?.userTasks;

  const [isActive, setIsActive] = useState(user.enabled);
  const [showDeActivate, setShowDeActivate] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const constraints = user.role === "TECHNICAL_MANAGER";

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
  };
  const closeChangePassword = () => {
    setShowChangePassword((prev) => !prev);
  };

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

      <ScrollView style={[styles.scrolling, shadowStyle.shadow_md]}>
        <View style={styles.userInformation}>
          <View
            style={[
              styles.userInfoContent,
              {
                flexDirection: constraints ? "column" : "row",
              },
            ]}
          >
            <View style={{ width: constraints ? "100%" : "50%" }}>
              <Text
                style={[
                  styles.fullName,
                  {
                    textAlign: constraints ? "center" : "left",
                  },
                ]}
              >
                {user.firstname} {user.lastname}
              </Text>
              <Text
                style={[
                  styles.emailStyle,
                  {
                    textAlign: constraints ? "center" : "left",
                  },
                ]}
              >
                {user.email}
              </Text>
            </View>
            <View
              style={{
                width: constraints ? "100%" : "50%",
              }}
            >
              <Text
                style={[
                  styles.roleText,
                  {
                    textAlign: constraints ? "center" : "right",
                  },
                ]}
              >
                {user.role}
              </Text>
            </View>
          </View>
          {user.role !== "TECHNICAL_MANAGER" && (
            <>
              <Text style={styles.header}>His teams:</Text>
              <ScrollView>
                {userTeams && userTeams.length > 0 ? (
                  userTeams.map((data, index) => (
                    <TeamCard
                      key={index}
                      hideIcon={true}
                      teamName={data.name}
                      teamDesc={data.description}
                      teamKey={data.signature}
                    />
                  ))
                ) : (
                  <Text style={styles.noJoined}>No teams exist!</Text>
                )}
              </ScrollView>

              <Text style={styles.header}>His tasks:</Text>
              <ScrollView>
                {userTasks && userTasks.length > 0 ? (
                  userTasks.map((data, index) => (
                    <IssueCard
                      key={index}
                      hideIcon={true}
                      issueKey={data.title}
                      summary={data.summary}
                    />
                  ))
                ) : (
                  <Text style={styles.noJoined}>No tasks exist!</Text>
                )}
              </ScrollView>
            </>
          )}
        </View>
      </ScrollView>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.btnContent} onPress={navToAddEditUser}>
          <Text style={styles.btnText}>{"Edit User"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnContent}
          onPress={changePasswordHandler}
        >
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
    paddingTop: 24,
    paddingBottom: 8,
  },
  scrolling: {
    width: "94%",
    height: "85%",
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 12,
  },
  userInformation: {
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  userInfoContent: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  fullName: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: "600",
  },
  emailStyle: {
    fontSize: 12,
    marginTop: 4,
    marginBottom: 16,
  },
  roleText: {
    textAlign: "center",
    fontSize: 11,
    fontWeight: "500",
    marginLeft: -12,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: -6,
  },
  noJoined: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 12,
  },
  buttons: {
    width: "94%",
    alignSelf: "center",
    justifyContent: "flex-end",
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
