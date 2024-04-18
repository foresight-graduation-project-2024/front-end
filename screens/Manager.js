import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Colors } from "../constants/config";
import Search from "../components/custom/Search";
import { getUserTasks, getUserTeams, getUsers } from "../store/actions/Users";
import Indicator from "./../components/custom/Indicator";
import { authLogout } from "../store/actions/Authentication";
import ListFilter from "../components/taskManager/ListFilter";

const { width, height } = Dimensions.get("window");

const Manager = ({ navigation }) => {
  const dispatch = useDispatch();

  let users = useSelector((state) => state.user.users);
  const isLoading = useSelector((state) => state.ui.isLoading);

  // const [taskTypeFilter, setTaskTypeFilter] = useState("ALL");

  users = users?.filter((user) => user.role !== "ADMIN");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => <Text style={styles.navHeader}>Manager</Text>,
      headerRight: () => (
        <View style={styles.logout}>
          <Ionicons
            name="log-out-outline"
            size={24}
            color="white"
            onPress={logoutHandler}
          />
        </View>
      ),
    });
    dispatch(getUsers());
  }, []);

  const logoutHandler = () => {
    dispatch(authLogout());
    navigation.navigate("Foresight");
  };

  const navToUserDetails = async (user) => {
    const clickedUser = users?.filter((u) => u.id === user.id);
    const userTeams =
      clickedUser[0].role !== "TECHNICAL_MANAGER"
        ? await dispatch(getUserTeams(user.id))
        : [];
    const userTasks =
      clickedUser[0].role !== "TECHNICAL_MANAGER"
        ? await dispatch(getUserTasks(user.id))
        : [];

    // console.log(userTasks);

    navigation.navigate("UserDetails", {
      user,
      userTeams,
      userTasks,
    });
  };

  const navToAddEditUser = () => {
    navigation.navigate("AddEditUser");
  };

  return (
    <View style={styles.container}>
      <Search />
      {/* <ScrollView
        style={styles.scrolling}
        horizontal={true}
        showsHorizontalScrollIndicator={true}
      >
        <ListFilter
          filterType="ALL"
          taskTypeFilter={taskTypeFilter}
          onChangeTaskTypeFilter={setTaskTypeFilter}
        />
        <ListFilter
          filterType="Active"
          taskTypeFilter={taskTypeFilter}
          onChangeTaskTypeFilter={setTaskTypeFilter}
        />
        <ListFilter
          filterType="Deactivate"
          taskTypeFilter={taskTypeFilter}
          onChangeTaskTypeFilter={setTaskTypeFilter}
        />
        <ListFilter
          filterType="DRIVER"
          taskTypeFilter={taskTypeFilter}
          onChangeTaskTypeFilter={setTaskTypeFilter}
        />
        <ListFilter
          filterType="WORKER"
          taskTypeFilter={taskTypeFilter}
          onChangeTaskTypeFilter={setTaskTypeFilter}
        />
        <ListFilter
          filterType="SITE_ENGINEER"
          taskTypeFilter={taskTypeFilter}
          onChangeTaskTypeFilter={setTaskTypeFilter}
        />
        <ListFilter
          filterType="MONITORING_ENGINEER"
          taskTypeFilter={taskTypeFilter}
          onChangeTaskTypeFilter={setTaskTypeFilter}
        />
        <ListFilter
          filterType="TECHNICAL_MANAGER"
          taskTypeFilter={taskTypeFilter}
          onChangeTaskTypeFilter={setTaskTypeFilter}
        />
        <ListFilter
          filterType="BUSINESS_MANAGER"
          taskTypeFilter={taskTypeFilter}
          onChangeTaskTypeFilter={setTaskTypeFilter}
        />
      </ScrollView> */}
      {isLoading ? (
        <Indicator />
      ) : (
        <ScrollView>
          {users.length > 0 ? (
            users?.map((user) => (
              <TouchableOpacity
                key={user.id}
                style={[
                  styles.userContainer,
                  {
                    backgroundColor: user.enabled
                      ? Colors.white
                      : Colors.dammed,
                  },
                ]}
                onPress={() => navToUserDetails(user)}
              >
                <View>
                  <Text style={styles.nameTitle}>
                    {user.firstname} {user.lastname}
                  </Text>
                </View>
                <Text style={styles.roleTitle}>{user.role}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noUser}>No user exist!</Text>
          )}
        </ScrollView>
      )}

      <TouchableOpacity style={styles.addUser} onPress={navToAddEditUser}>
        <Ionicons
          name="add"
          size={34}
          color={Colors.white}
          style={{ marginTop: -2 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  scrolling: {
    flexDirection: "row",
    paddingLeft: 12,
    marginTop: 24,
  },
  navHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.white,
  },
  logout: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 24,
  },
  refreshIcon: {
    width: 24,
    height: 24,
  },
  taskIcon: {
    width: 24,
    height: 24,
  },
  userContainer: {
    width: "96%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    padding: 12,
    borderRadius: 8,

    shadowColor: Colors.lightGrey,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  nameTitle: {
    fontSize: 16,
    marginBottom: 2,
  },
  emailTitle: {
    fontSize: 12,
    color: Colors.grey,
  },
  roleTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    marginRight: 4,
  },
  icons: {
    flexDirection: "row",
  },
  addUser: {
    position: "absolute",
    width: 48,
    height: 48,
    borderRightColor: 24,
    zIndex: 1000,
    left: width - 80,
    top: height - 160,
    padding: 8,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    shadowColor: Colors.lightGrey,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  noUser: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 48,
  },
});

export default Manager;
