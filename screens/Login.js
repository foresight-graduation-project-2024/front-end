import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import i18n from "../constants/Localization";

import Input from "../components/custom/Input";
import Button from "../components/custom/Button";
import { Colors } from "../constants/config";
import {
  accountDeactivatedThunk,
  signInFailedThunk,
  verifyLogIn,
} from "../store/actions/Authentication";
import DotPulse from "../components/custom/DotPulse";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.ui.isLoading);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRemember, setIsRemember] = useState(false);
  const [isSecure, setIsSecure] = useState(true);
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const [isAccountDeactivated, setIsAccountDeactivated] = useState(false);

  const toggleCheckbox = useCallback(() => {
    setIsRemember((prevIsRemember) => !prevIsRemember);
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setIsSecure((prevIsSecure) => !prevIsSecure);
  }, []);

  const loginHandler = async () => {
    try {
      const authData = { email, password };
      const data = await dispatch(verifyLogIn(authData, isRemember));
      if (data.role === "ADMIN") navigation.replace("Manager");
      else navigation.replace("Task");
    } catch (err) {
      if (err.response.data.code === 5) {
        const newState = await dispatch(signInFailedThunk(true));
        setIsLoginFailed(newState.auth.signInFailed);
      } else if (err.response.data.code === 6) {
        const newState = await dispatch(accountDeactivatedThunk(true));
        setIsAccountDeactivated(newState.auth.accountDeactivated);
      } else console.log("VerifyLogIn ERROR ===> ", err);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.subContent}>
        <Image source={require("../assets/mark.png")} style={styles.logo} />
      </View>

      <View style={styles.subContent}>
        <Text style={styles.welcomeTitle}>{i18n.t("welcomeBack")}</Text>
        <Text style={styles.title}>{i18n.t("enterYourDetails")}</Text>
      </View>

      <View style={styles.inputField}>
        <Input
          label={i18n.t("email")}
          value={email}
          onUpdateValue={setEmail}
          keyboardType="email-address"
        />
        <Input
          label={i18n.t("password")}
          secure={isSecure}
          value={password}
          onUpdateValue={setPassword}
          rightIcon={
            isSecure
              ? require("../assets/visibility_off.png")
              : require("../assets/visibility_on.png")
          }
          onPressRightIcon={togglePasswordVisibility}
        />
        {isLoginFailed && (
          <Text style={styles.validation}>{i18n.t("loginFail")}</Text>
        )}

        {isAccountDeactivated && (
          <Text style={styles.validation}>{i18n.t("yourDeactivate")}</Text>
        )}
      </View>

      <View style={styles.checkedContent}>
        <TouchableOpacity onPress={toggleCheckbox}>
          <Ionicons
            name={isRemember ? "checkbox" : "square-outline"}
            size={20}
            color={isRemember ? Colors.primary : Colors.grey}
            style={styles.checkIcon}
          />
        </TouchableOpacity>
        <Text>{i18n.t("rememberMe")}</Text>
      </View>

      <View style={styles.btnContainer}>
        <Button
          onPress={loginHandler}
          btnStyle={{
            backgroundColor:
              email === "" || password === "" ? Colors.dammed : Colors.primary,
          }}
          disabled={email === "" || password === ""}
        >
          {isLoading ? <DotPulse /> : i18n.t("logIn")}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "92%",
    alignSelf: "center",
  },
  subContent: {
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 75,
    marginTop: 108,
    marginBottom: 12,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 2,
  },
  title: {
    fontSize: 12,
    color: Colors.grey,
  },
  inputField: {
    width: "100%",
    alignSelf: "center",
    marginTop: 32,
  },
  checkedContent: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 42,
  },
  validation: {
    color: Colors.error,
    marginVertical: 6,
    marginLeft: 4,
    fontSize: 12,
  },
  checkIcon: {
    marginRight: 4,
  },
  btnContainer: {
    width: "35%",
    alignSelf: "center",
  },
});

export default Login;
