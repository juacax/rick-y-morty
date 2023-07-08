import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Episodios from "./Episodios";
import Localizaciones from "./Localizaciones";

export default function Home() {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "tomato" },
        tabBarLabelStyle: { color: "#FFF" },
      }}
    >
      <Tab.Screen name="EPISODIOS" component={Episodios} />
      <Tab.Screen name="LOCALIZACIONES" component={Localizaciones} />
    </Tab.Navigator>
  );
}
