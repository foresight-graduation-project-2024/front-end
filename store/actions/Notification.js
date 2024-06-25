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

    // console.log("Response: ", response)

    if (!response.ok) console.log("Failed to subscribe to topic");
    // else console.log("Connected to topic successfully")
  } catch (error) {
    console.log("Error subscribing to topic:", error);
  }
};

export const unsubscribeFromUserTopic = async (userId) => {
  try {
    const token = await getExpoPushToken();
    // console.log("User id => ", userId);
    // console.log("Unsubscribe token => ", token)
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
      // else console.log(`Unsubscribed from topic: ${topic}`);
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

  const token = (
    await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig?.extra?.eas.projectId,
    })
  ).data;
  return token;
};

export const setupNotifications = async (navigation, userId) => {
  const token = await getExpoPushToken();

  // console.log("Token: ", token);
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

  // Handle user opening the app from a notification (when the app is in the background)
  // messaging().onNotificationOpenedApp((remoteMessage) => {
  //   const screen = remoteMessage?.data?.screen;
  //   if (screen) navigation.navigate(screen);
  //   else navigation.navigate("Notification");
  // });

  // Check if the app was opened from a notification (when the app was completely quit)
  // messaging()
  //   .getInitialNotification()
  //   .then((remoteMessage) => {
  //     if (remoteMessage) {
  //       const screen = remoteMessage?.data?.screen;
  //       if (screen) navigation.navigate(screen);
  //       else navigation.navigate("Notification");
  //     }
  //   });

  return () => {
    notificationClickSubscription.remove();
  };
};

const setUserNotification = (payload) => ({
  type: actions.SET_NOTIFICATION,
  payload,
});
