import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

import { baseNotificationUrl } from "../../constants/config";

const WebSocketComponent = ({userId}) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = new SockJS(`${baseNotificationUrl}/websocket-Initializer`);
    const stompClient = Stomp.over(socket, {
      protocols: ['v10.stomp', 'v11.stomp', 'v12.stomp'],
    });

    stompClient.connect({}, () => {
      console.log("Connected to WebSocket");

      stompClient.subscribe(
        `/user/${userId}/topic/private-notifications`,
        (message) => {
          console.log("Received message:", JSON.parse(message.body));
          const newMessage = JSON.parse(message.body).content;

          // Update local state to display messages
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      );
    });

    return () => {
      if (stompClient) {
        stompClient.disconnect();
        console.log("Disconnected");
      }
    };
  }, []);

  console.log("Messages =>", messages);

  return (
    <ScrollView>
      {messages.map((msg, index) => (
        <View
          key={index}
          style={{
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
          }}
        >
          <Text>{msg}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default WebSocketComponent;