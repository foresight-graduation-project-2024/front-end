import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";

import Login from "./screens/Login";
import { Colors } from "./constants/config";
import Manager from "./screens/Manager";
import AddEditUser from "./components/manager/AddEditUser";
import UserDetails from "./components/manager/UserDetails";
import { configureStore } from "./store/store";
import ManageTasks from "./screens/ManageTasks";
import Teams from "./components/taskManager/Teams";
import Issues from "./components/taskManager/Issues";
import Splash from "./screens/Splash";

const Stack = createNativeStackNavigator();
const bottomTab = createBottomTabNavigator();

function TasksOverview({}) {
  const navigation = useNavigation();

  return (
    <bottomTab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: Colors.white,
        tabBarStyle: { backgroundColor: Colors.mainBackground },
        tabBarActiveTintColor: Colors.primary,
      }}
    >
      <bottomTab.Screen
        name="Teams"
        component={Teams}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="folder" color={color} size={size} />
            // <Image
            //   source={require("./assets/team.png")}
            //   style={{ width: 26, height: 26 }}
            // />
          ),
        }}
      />
      <bottomTab.Screen
        name="Issues"
        component={Issues}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" color={color} size={size} />
            // <Image
            //   source={require("./assets/issue.png")}
            //   style={{ width: 26, height: 26 }}
            // />
          ),
        }}
      />
      <bottomTab.Screen
        name="Notifications"
        component={Issues}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" color={color} size={size} />
          ),
        }}
      />
    </bottomTab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={configureStore()}>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Foresight"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Manager"
            component={Manager}
            // options={{ headerShown: false }}
          />
          <Stack.Screen name="AddEditUser" component={AddEditUser} />
          <Stack.Screen name="UserDetails" component={UserDetails} />
          <Stack.Screen
            name="Task"
            component={TasksOverview}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Board" component={ManageTasks} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
