import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const TeamCard = (props) => {
  return (
    <TouchableOpacity style={[styles.container, {
      flexDirection: props.hideIcon ? "row-reverse" : "row",
    }]} onPress={props.onPress}>
      <Text>{props.teamKey}</Text>
      <View style={styles.teamDetails}>
        <Text style={styles.teamName}>{props.teamName}</Text>
        <Text>
          {props.teamDesc.length > 30
            ? props.teamDesc.substring(0, 30) + " ..."
            : props.teamDesc}
        </Text>
      </View>
      {!props.hideIcon && (
        <Image
          source={require("../../assets/chevron_left.png")}
          style={styles.icon}
        />
      )}
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
    paddingHorizontal: 8,
  },
  teamDetails: {
    width: "60%",
    justifyContent: "center",
  },
  teamName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 2,
  },
  icon: {
    width: 24,
    height: 24,
    transform: [{ scaleX: -1 }],
  },
});

export default TeamCard;
