import React, { useCallback, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

import { Colors } from "../../constants/config";
import Input from "../custom/Input";
import Button from "../custom/Button";
import {
  addNewUser,
  editUserDetails,
  emailExist,
} from "../../store/actions/Users";
import DotPulse from "../custom/DotPulse";
import { emailRegex, passwordRegex } from "../../constants/config";

const AddEditUser = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isEditing = route.params?.isEditing;
  const user = route.params?.user;

  const [userDetails, setUserDetails] = useState({
    firstName: isEditing ? user.firstname : "",
    lastName: isEditing ? user.lastname : "",
    email: isEditing ? user.email : "",
    password: isEditing ? user.password : "",
  });

  const [validation, setValidation] = useState({
    isFirstNameValid: true,
    isLastNameValid: true,
    isEmailValid: true,
    isPasswordValid: true,
  });

  const [role, setRole] = useState(isEditing ? user.role : "DRIVER");
  const [isDragVisible, setIsDragVisible] = useState(false);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const isEmailExist = useSelector((state) => state.user.emailExist);
  const [isSecure, setIsSecure] = useState(true);

  const roles = [
    "DRIVER",
    "WORKER",
    "SITE_ENGINEER",
    "MONITORING_ENGINEER",
    "TECHNICAL_MANAGER",
    "BUSINESS_MANAGER",
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit user" : "Add new user",
    });
  }, [isEditing]);

  const clearInputs = () => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    }));
    setRole("");
  };

  const validationInputs = () => {
    const checks = {
      isFirstNameValid: userDetails.firstName.trim() !== "",
      isLastNameValid: userDetails.lastName.trim() !== "",
      isEmailValid: emailRegex.test(userDetails.email),
      isPasswordValid: passwordRegex.test(userDetails.password),
    };

    let isValid = true;
  
    const newValidationState = Object.entries(checks).reduce((prevState, [key, check]) => {
      if (!check) isValid = false;
      return { ...prevState, [key]: check };
    }, {});
  
    setValidation((prevState) => ({ ...prevState, ...newValidationState }));

    return isValid;
  };

  changeUserDetailsHandler = useCallback((name, value) => {
    if (isEmailExist) dispatch(emailExist(false));
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  }, []);

  const AddUserHandler = async () => {
    try {
      const isValid = validationInputs();
      if (!isValid) {
        return;
      }
      const userData = {
        firstname: userDetails.firstName,
        lastname: userDetails.lastName,
        email: userDetails.email,
        password: userDetails.password,
        role,
        enabled: true,
      };
      const resp = await dispatch(addNewUser(userData));
      clearInputs();
      if (resp) navigation.goBack();
    } catch (err) {
      console.log("AddUserHandler ===>", err);
    }
  };

  const EditUserHandler = async () => {
    try {
      const id = user.id;
      const newUserData = {
        firstname: userDetails.firstName,
        lastname: userDetails.lastName,
        role,
        enabled: user.enabled,
      };
      const resp = await dispatch(editUserDetails(id, newUserData));
      clearInputs();
      if (resp) {
        navigation.goBack();
        navigation.goBack();
      }
    } catch (err) {
      console.log("EditUserHandler ==>", err);
    }
  };

  const selectRole = (item) => {
    setRole(item);
    setIsDragVisible(false);
  };

  const togglePasswordVisibility = useCallback(() => {
    setIsSecure((prevIsSecure) => !prevIsSecure);
  }, []);

  return (
    <View style={styles.modalView}>
      <View style={styles.modalContent}>
        <View style={styles.userName}>
          <View style={styles.inputWrapper}>
            <Input
              label="First Name"
              value={userDetails.firstName}
              onUpdateValue={(value) =>
                changeUserDetailsHandler("firstName", value)
              }
              borderColor={
                validation.isFirstNameValid ? Colors.lightGrey : Colors.error
              }
            />
          </View>
          <View style={styles.inputWrapper}>
            <Input
              label="Last Name"
              value={userDetails.lastName}
              onUpdateValue={(value) =>
                changeUserDetailsHandler("lastName", value)
              }
              borderColor={
                validation.isLastNameValid ? Colors.lightGrey : Colors.error
              }
            />
          </View>
        </View>
        {!isEditing && (
          <>
            <Input
              label="Email Address"
              name="email"
              value={userDetails.email}
              onUpdateValue={(value) =>
                changeUserDetailsHandler("email", value)
              }
              borderColor={
                validation.isEmailValid ? Colors.lightGrey : Colors.error
              }
            />
            <Text style={{ marginBottom: 6 }}>
              Email must include
              <Text style={{ fontWeight: "bold" }}> @foresight.com</Text>
            </Text>

            <Input
              label="Password"
              name="password"
              secure={isSecure}
              value={userDetails.password}
              onUpdateValue={(value) =>
                changeUserDetailsHandler("password", value)
              }
              borderColor={
                validation.isPasswordValid ? Colors.lightGrey : Colors.error
              }
              rightIcon={
                isSecure
                  ? require("../../assets/visibility_off.png")
                  : require("../../assets/visibility_on.png")
              }
              onPressRightIcon={togglePasswordVisibility}
            />
          </>
        )}

        <TouchableOpacity
          onPress={() => setIsDragVisible(!isDragVisible)}
          activeOpacity={1}
          style={[styles.dropDown, { height: 46, marginTop: 12 }]}
        >
          <View style={styles.arrow}>
            {!isDragVisible ? (
              <Image source={require("../../assets/expand_more.png")} />
            ) : (
              <Image source={require("../../assets/expand_more_up.png")} />
            )}
          </View>
          <View style={[styles.dropDownDisplay]}>
            <Text style={styles.labelStyle}>{role}</Text>
          </View>
          <View style={styles.inLineLabelView}>
            <Text>Role</Text>
          </View>
        </TouchableOpacity>

        {isDragVisible && (
          <View style={styles.dropDown}>
            <ScrollView
              showsVerticalScrollIndicator={true}
              persistentScrollbar={true}
              style={{ width: "100%" }}
              nestedScrollEnabled={true}
            >
              {roles.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => selectRole(item)}
                  style={styles.dropDownItem}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {isEmailExist && (
          <View>
            <Text style={styles.validation}>
              Email already exist! please change it.
            </Text>
          </View>
        )}

        <View style={styles.btn}>
          <Button
            onPress={isEditing ? EditUserHandler : AddUserHandler}
            btnStyle={{ backgroundColor: Colors.primary }}
          >
            {isLoading ? <DotPulse /> : isEditing ? "Save" : "Add"}
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    width: "100%",
    backgroundColor: Colors.white,
  },
  modalContent: {
    width: "100%",
    padding: 16,
    marginTop: 16,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 16,
  },
  userName: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputWrapper: {
    width: "45%",
  },
  arrow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    paddingVertical: 8,
  },
  dropDownDisplay: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    flexGrow: 1,
  },
  labelStyle: {
    flex: 1,
    justifyContent: "center",
    textAlign: "right",
    fontSize: 16,
    color: Colors.primary,
    marginRight: 24,
  },
  inLineLabelView: {
    marginRight: -36,
  },
  dropDown: {
    width: "100",
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: Colors.borderColor,
    zIndex: 100,
  },
  dropDownItem: {
    width: "100%",
    justifyContent: "center",
    paddingVertical: 6,
  },
  validation: {
    color: Colors.error,
    marginVertical: 6,
    marginLeft: 4,
    fontSize: 12,
  },
  btn: {
    width: "40%",
    marginTop: 24,
    marginLeft: 212,
  },
});

export default AddEditUser;
