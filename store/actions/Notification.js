import axios from "axios";
import * as actions from "./actionTypes";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { baseUrl } from "../../constants/config";
import { uiStartLoading, uiStopLoading } from "./Ui";
import { getCurToken } from "./Users";

const subscribeToUserTopic = async (token, userId) => {
  try {
    console.log("FCM Token => ", token);
    const authToken = await AsyncStorage.getItem("authToken");
    const response = await fetch(
      `${baseUrl}/fcm/subscriptions/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `${authToken}`
        },
        body: JSON.stringify([token]),
      }
    );

    if (!response.ok) console.log("Failed to subscribe to topic");
  } catch (error) {
    console.log("Error subscribing to topic:", error);
  }
};

export const unsubscribeFromUserTopic = async (userId) => {
  try {
    const token = await getExpoPushToken();
    const authToken = await AsyncStorage.getItem("authToken");
    if (token) {
      const response = await fetch(
        `${baseUrl}/fcm/subscriptions/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `${authToken}`
          },
          body: token
        }
      );

      if (!response.ok) console.log("Failed to unsubscribe from topic");
    } else console.log("Token not found");
  } catch (error) {
    console.log("Error unsubscribing from topic:", error);
  }
};

export const getAllUserNotification = (userId) => async (dispatch) => {
  try {
    dispatch(uiStartLoading());
    const headers = await dispatch(getCurToken());
    const response = await axios.get(`${baseUrl}/notification/${userId}`, {
      headers,
    });
    dispatch(setUserNotification(response.data.content));
  } catch (error) {
    console.log("getAllUserNotification ERROR ==>", error);
    console.log(
      "getAllUserNotification ERROR CODE ==>",
      error.response.data.code
    );
  } finally {
    dispatch(uiStopLoading());
  }
};

const getExpoPushToken = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      console.log("Failed to get push token for push notification!");
      return;
    }
  }

  try {
    const tokenData = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig?.extra?.eas.projectId,
    });
    const token = tokenData.data;
    return token;
  } catch (error) {
    console.log("Error getting Expo push token:", error);
  }
};

export const setupNotifications = async (navigation, userId) => {
  const token = await getExpoPushToken();

  if (token) {
    await subscribeToUserTopic(token, userId);
  }

  // Set up the notification handler for the app
  Notifications.setNotificationHandler({
    handleNotification: () => {
      return {
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      };
    },
  });

  // Handle user clicking on a notification and open the screen
  const handleNotificationClick = (response) => {
    const screen = response?.notification?.request?.content?.data?.screen;
    if (screen) {
      navigation.navigate(screen);
    } else {
      navigation.navigate("Notifications");
    }
  };

  // Listen for user clicking on a notification
  const notificationClickSubscription =
    Notifications.addNotificationResponseReceivedListener(
      handleNotificationClick
    );

  return () => {
    notificationClickSubscription.remove();
  };
};

const setUserNotification = (payload) => ({
  type: actions.SET_NOTIFICATION,
  payload,
});
