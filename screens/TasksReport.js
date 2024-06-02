import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const TasksReport = () => {
  return (
    // <View style={styles.container}>
    //   <Text style={styles.header}>Task List Report</Text>
    //   <View style={styles.row}>
    //     <Text style={styles.boldText}>Task</Text>
    //     <Text style={styles.boldText}>Due Date</Text>
    //     <Text style={styles.boldText}>Est Hrs</Text>
    //     <Text style={styles.boldText}>Act Hours</Text>
    //     <Text style={styles.boldText}>Rem Hrs</Text>
    //   </View>
    //   {/* Repeat this View block for each task */}
    //   <View style={styles.row}>
    //     <Text>User Experience Research</Text>
    //     <Text>Today</Text>
    //     <View style={styles.barContainer}>
    //       <View style={[styles.bar, styles.estimatedBar, { width: '50%' }]} />
    //       <View style={[styles.bar, styles.actualBar, { width: '20%' }]} />
    //     </View>
    //     <Text>3</Text>
    //   </View>
    //   {/* ...other tasks */}
    // </View>
    <View style={styles.container}>
      <Text style={styles.headerText}>Projects</Text>
      <View style={styles.statusContainer}>
        <View style={styles.statusBox}>
          <Text style={styles.statusNumberActive}>3</Text>
          <Text style={styles.statusText}>Active Projects</Text>
        </View>
        <View style={styles.statusBox}>
          <Text style={styles.statusNumberTotal}>79</Text>
          <Text style={styles.statusText}>Total Tasks</Text>
        </View>
        <View style={styles.statusBox}>
          <Text style={styles.statusNumberCompleted}>60</Text>
          <Text style={styles.statusText}>Completed Tasks</Text>
        </View>
        <View style={styles.statusBox}>
          <Text style={styles.statusNumberOverdue}>13</Text>
          <Text style={styles.statusText}>Overdue Tasks</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   padding: 10,
  // },
  // header: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   marginBottom: 10,
  // },
  // row: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   paddingVertical: 5,
  // },
  // boldText: {
  //   fontWeight: 'bold',
  // },
  // barContainer: {
  //   flexDirection: 'row',
  //   flex: 1,
  // },
  // bar: {
  //   height: 10,
  //   borderRadius: 5,
  // },
  // estimatedBar: {
  //   backgroundColor: '#blue',
  // },
  // actualBar: {
  //   backgroundColor: '#red',
  //   position: 'absolute',
  // },
  container: {
    padding: 20,
    backgroundColor: "#fff", // replace with your desired background color
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerText: {
    fontWeight: "bold",
  },
  viewAllText: {
    color: "#3498db", // replace with your desired color
    fontWeight: "bold",
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
  },
  statusBox: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  statusNumberActive: {
    color: "#3498db",
    fontWeight: "bold",
    fontSize: 24,
  },
  statusNumberTotal: {
    color: "#f1c40f",
    fontWeight: "bold",
    fontSize: 24,
  },
  statusNumberCompleted: {
    color: "#2ecc71",
    fontWeight: "bold",
    fontSize: 24,
  },
  statusNumberOverdue: {
    color: "#e74c3c",
    fontWeight: "bold",
    fontSize: 24,
  },
  statusText: {
    textAlign: "center",
    color: "#7f8c8d",
  },
});

export default TasksReport;
