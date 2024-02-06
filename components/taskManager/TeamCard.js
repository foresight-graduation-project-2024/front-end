import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

const TeamCard = (props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.content}>
        <Image source={props.teamLogo} style={styles.teamLogo} />
        <View>
          <Text style={[styles.teamName, { fontSize: 16 }]}>
            {props.teamName}
          </Text>
          <Text style={styles.teamName}>{props.teamDescription}</Text>
        </View>
      </View>
      <Image
        source={require("../../assets/chevron_left.png")}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  content: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  teamLogo: {
    width: 36,
    height: 36,
    marginRight: 16,
  },
  teamName: {
    justifyContent: "center",
  },
  icon: {
    width: 24,
    height: 24,
    transform: [{ scaleX: -1 }],
  },
});

export default TeamCard;
