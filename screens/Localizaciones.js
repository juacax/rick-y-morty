import { useEffect, useState, useContext } from "react";
import { Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { FiltroContext } from "../contexts/FiltroContext";
import { useIsFocused } from "@react-navigation/native";

export default function Localizaciones({ navigation }) {
  const [localizaciones, setLocalizaciones] = useState([]);
  const [locList, setLocList] = useState(<></>);
  const [filtro, setFiltro] = useContext(FiltroContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setFiltro("");
    }
  }, [isFocused]);

  const getLocalizaciones = async () => {
    try {
      const response = await fetch("https://rickandmortyapi.com/api/location");
      const json = await response.json();
      setLocalizaciones(json.results);
    } catch (error) {
      console.error(error);
    }
  };

  const getLocList = () => {
    let lista = localizaciones.map((e) => {
      const nom = e.name.toUpperCase();
      if (
        nom.startsWith(filtro.toUpperCase()) ||
        nom.includes(filtro.toUpperCase())
      ) {
        return (
          <TouchableOpacity
            key={"Loc" + e.id}
            style={Styles.touch}
            onPress={() => {
              navigation.navigate("Localizacion", { id: e.id });
            }}
          >
            <Text style={Styles.tipo}>{e.type}</Text>
            <Text>{e.name}</Text>
            <Text style={Styles.dimension}>{e.dimension}</Text>
          </TouchableOpacity>
        );
      }
    });
    setLocList(lista);
  };

  useEffect(() => {
    getLocList();
  }, [localizaciones, filtro]);

  useEffect(() => {
    getLocalizaciones();
  }, []);

  return (
    <>
      <ScrollView>{locList}</ScrollView>
    </>
  );
}

const Styles = StyleSheet.create({
  touch: {
    padding: 20,
    borderBottomColor: "#CCC",
    borderBottomWidth: 1,
  },
  tipo: {
    color: "#888",
    fontSize: 9,
  },
  dimension: {
    color: "#888",
    fontSize: 12,
  },
});
