import React from "react";
import { StyleSheet, Text, Image, TouchableOpacity } from "react-native";

const IssueCard = (props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.issueNum}>{props.issueKey}</Text>
      <Text>
        {props.issueSummary.length > 30
          ? props.issueSummary.substring(0, 30) + " ..."
          : props.issueSummary}
      </Text>
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
