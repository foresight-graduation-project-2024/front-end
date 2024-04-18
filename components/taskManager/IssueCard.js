import React from "react";
import { StyleSheet, Text, Image, TouchableOpacity } from "react-native";

const IssueCard = (props) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          flexDirection: props.hideIcon ? "row-reverse" : "row",
        },
      ]}
      onPress={props.onPress}
    >
      <Text style={styles.issueNum}>{props.issueKey}</Text>
      <Text>
        {props.summary.length > 30
          ? props.summary.substring(0, 30) + " ..."
          : props.summary}
      </Text>
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
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 8,
  },
  issueNum: {
    fontSize: 16,
    fontWeight: "500",
  },
  icon: {
    width: 24,
    height: 24,
    transform: [{ scaleX: -1 }],
  },
});

export default IssueCard;
