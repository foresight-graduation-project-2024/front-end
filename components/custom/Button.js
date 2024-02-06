import {
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";

import { Colors } from "../../constants/config";

function Button(props) {
  return (
    <TouchableOpacity
      style={[styles.button, { 
        backgroundColor: props.backgroundColor,
        marginTop: props.marginTop || 0,
        marginBottom: props.marginBottom || 0,
        width: props.width || "100%",
        height: props.height || 38,
        borderRadius: props.borderRadius || 6,
        paddingVertical: props.paddingVertical || 8,
      }]}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      <Text
        style={[
          styles.buttonText,
          { color: props.color ? props.color : Colors.white },
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
