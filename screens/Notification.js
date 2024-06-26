import React, { useCallback, useLayoutEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import { getAllUserNotification } from "../store/actions/Notification";
import Indicator from "../components/custom/Indicator";
import { Colors } from "../constants/config";
import { authLogout } from "../store/actions/Authentication";

const Notification = ({ navigation }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const allNotification = useSelector(
    (state) => state.notification.userNotification
  );
  const isLoading = useSelector((state) => state.ui.isLoading);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.navIcon}>
          <Ionicons
            name="log-out-outline"
            size={24}
            color="white"
            onPress={logoutHandler}
          />
        </View>
      ),
    });
  }, []);

  useFocusEffect(useCallback(() => {
    dispatch(getAllUserNotification(user.id));
  }, [user.id, dispatch]));

  const logoutHandler = () => {
    dispatch(authLogout());
    navigation.replace("Foresight");
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Indicator />
      ) : (
        <ScrollView style={styles.scrolling}>
          {allNotification && allNotification.length > 0 ? (
            allNotification
              .sort((a, b) => new Date(b.issuedDate) - new Date(a.issuedDate))
              .map((data, index) => (
                <View key={index} style={styles.notificationContainer}>
                  <Text>{data.content}</Text>
                  <Text style={styles.dateText}>
                    {formatDistanceToNow(new Date(data.issuedDate), {
                      addSuffix: true,
                    })}
                  </Text>
                </View>
              ))
          ) : (
            <Text style={styles.noNotification}>No notification found!</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navIcon: {
    marginRight: 12,
  },
  container: {
    padding: 12,
  },
  notificationContainer: {
    backgroundColor: Colors.white,
    marginBottom: 12,
    padding: 12,
    borderRadius: 6,
  },
  dateText: {
    fontSize: 12,
    color: Colors.grey,
    textAlign: "right",
    marginTop: 6,
  },
  scrolling: {
    // width: "100%",
    // marginBottom: 12,
  },
  noNotification: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 48,
  },
});

export default Notification;
