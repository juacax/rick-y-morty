import "react-native-gesture-handler";
import { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Searchbar } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FiltroContext } from "./contexts/FiltroContext";
import Home from "./screens/Home";
import Episodio from "./screens/Episodio";
import Localizacion from "./screens/Localizacion";

export default function App() {
  const Stack = createStackNavigator();
  const [filtro, setFiltro] = useState("");
  const searchBar = useRef(null);

  return (
    <FiltroContext.Provider value={[filtro, setFiltro]}>
      <NavigationContainer>
        <StatusBar />
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerTintColor: "white",
              headerStyle: { backgroundColor: "tomato" },
              title: "Rick and Morty",
              headerRight: () => (
                <Searchbar
                  placeholder=""
                  placeholderTextColor="#FFF"
                  color="#FFF"
                  textAlign="right"
                  onIconPress={() => searchBar.current.focus()}
                  onChangeText={(e) => setFiltro(e)}
                  value={filtro}
                  ref={searchBar}
                  style={{
                    backgroundColor: "tomato",
                    placeholderTextColor: "#FFF",
                    flexDirection: "row-reverse",
                  }}
                  iconColor="#FFF"
                />
              ),
            }}
          />
          <Stack.Screen name="Episodio" component={Episodio} />
          <Stack.Screen name="Localizacion" component={Localizacion} />
        </Stack.Navigator>
      </NavigationContainer>
    </FiltroContext.Provider>
  );
}
