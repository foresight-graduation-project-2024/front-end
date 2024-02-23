import {
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";

import { Colors } from "../../constants/config";

function Button(props) {
  return (
    <TouchableOpacity
      style={[styles.button, props.btnStyle]}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      <Text
        style={[
          styles.buttonText,
          { color: props.textColor ? props.textColor : Colors.white },
        ]}
      >
        {props.children}
      </Text>
    </TouchableOpacity>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    marginTop: 0,
    marginBottom: 0,
    width: "100%",
    height: 38,
    borderRadius: 6,
    paddingVertical: 8,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
