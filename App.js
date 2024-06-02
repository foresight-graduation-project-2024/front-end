import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

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
import Notification from "./screens/Notification";
import TasksReport from "./screens/TasksReport";

const Stack = createNativeStackNavigator();
const bottomTab = createBottomTabNavigator();

function TasksOverview({}) {
  const user = useSelector((state) => state.user.user);

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
            <Ionicons name="people" color={color} size={size} />
          ),
        }}
      />
      <bottomTab.Screen
        name="Issues"
        component={Issues}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bug" color={color} size={size} />
            // <Ionicons name="alert-circle" color={color} size={size} />
          ),
        }}
      />
      {/* {user && user.role === "TECHNICAL_MANAGER" && (
        <bottomTab.Screen
          name="Report"
          component={TasksReport}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="pie-chart-outline" color={color} size={size} />
            ),
          }}
        />
      )} */}
      <bottomTab.Screen
        name="Notifications"
        component={Notification}
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
          <Stack.Screen name="Manager" component={Manager} />
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
