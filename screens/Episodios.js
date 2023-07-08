import { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import { FiltroContext } from "../contexts/FiltroContext";

export default function Episodios({ navigation }) {
  const [filtro, setFiltro] = useContext(FiltroContext);
  const isFocused = useIsFocused();

  useEffect(()=>{
    if(isFocused){
      setFiltro("");
    }
  },[isFocused])

  const [episodios, setEpisodios] = useState([]);
  const [epiList, setEpiList] = useState(<></>);

  const getEpisodios = async () => {
    try {
      const response = await fetch("https://rickandmortyapi.com/api/episode");
      const json = await response.json();
      setEpisodios(json.results);
    } catch (error) {
      console.error(error);
    }
  };

  const getEpiList = () => {
    let lista = episodios.map((e) => {
      const nom = e.name.toUpperCase();
      if (nom.startsWith(filtro.toUpperCase()) || nom.includes(filtro.toUpperCase())) {
        return (
          <TouchableOpacity
            style={Styles.touch}
            key={"epi" + e.id}
            onPress={() => {
              navigation.navigate("Episodio", { id: e.id });
            }}
          >
            <Text style={Styles.episodio}>{e.episode}</Text>
            <Text>{e.name}</Text>
            <Text style={Styles.fecha}>{e.air_date}</Text>
          </TouchableOpacity>
        );
      }
    });
    setEpiList(lista);
  };

  useEffect(() => {
    getEpiList();
  }, [episodios, filtro]);

  useEffect(() => {
    getEpisodios();
  }, []);

  return (
    <>
      <ScrollView>{epiList}</ScrollView>
    </>
  );
}

const Styles = StyleSheet.create({
  touch: {
    padding: 20,
    borderBottomColor: "#CCC",
    borderBottomWidth: 1,
  },
  episodio: {
    color: "#888",
    fontSize: 9,
  },
  fecha: {
    color: "#888",
    fontSize: 12,
  },
});
