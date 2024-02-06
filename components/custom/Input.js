import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

import { Colors } from "../../constants/config";

function Input(props) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{props.label}</Text>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: props.borderColor || Colors.lightGrey,
            },
          ]}
          autoCapitalize="none"
          keyboardType={props.keyboardType}
          secureTextEntry={props.secure}
          value={props.value}
          onChangeText={props.onUpdateValue}
          multiline={props.multiline}
          maxLength={props.maxLength || 120}
        />
        {props.rightIcon && (
          <View style={styles.iconView}>
            <TouchableOpacity onPress={props.onPressRightIcon}>
              <Image
                source={props.rightIcon}
                style={styles.rightIcon}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: Colors.black,
    marginBottom: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    backgroundColor: Colors.white,
    borderWidth: 1,
    color: Colors.black,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  iconView: {
    position: "absolute",
    top: 12,
    right: 20,
    zIndex: 90,
  },
  rightIcon: {
    width: 24,
    height: 24,
    marginTop: -2,
  },
});

export default Input;
