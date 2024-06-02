import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import { formatDistanceToNow } from "date-fns";
import { Audio } from "expo-av";

import { baseNotificationUrl } from "../../constants/config";

const WebSocketComponent = (props) => {
  const [messages, setMessages] = useState([]);
  const [sound, setSound] = useState();

  useEffect(() => {
    const socket = new SockJS(`${baseNotificationUrl}/websocket-Initializer`);
    const stompClient = Stomp.over(socket, {
      protocols: ["v10.stomp", "v11.stomp", "v12.stomp"],
    });

    stompClient.connect({}, () => {
      stompClient.subscribe(
        `/user/${props.userId}/topic/private-notifications`,
        (message) => {
          const { content, issuedDate } = JSON.parse(message.body);
          const newMessage = { content, issuedDate };

          setMessages((prevMessages) => [...prevMessages, newMessage]);

          if (sound) {
            console.log("Execute the sound!");
            sound.playAsync();
          }
        }
      );
    });

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    loadSound();
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, []);

  const loadSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/breebles_music.mp3')
    );
    setSound(sound);
  }

  return (
    <ScrollView>
      {messages.map((msg, index) => (
        <View key={index} style={props.notificationContainer}>
          <Text>{msg.content}</Text>
          <Text style={props.dateText}>
            {formatDistanceToNow(new Date(msg.issuedDate), {
              addSuffix: true,
            })}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default WebSocketComponent;
