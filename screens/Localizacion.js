import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";

export default function Localizacion({ route, navigation }) {
  const { id = 0 } = route.params;
  const [localizacion, setLocalizacion] = useState(null);
  const [imgPersonajes, setImgPersonajes] = useState([]);

  const getLocalizacion = async (id) => {
    try {
      const response = await fetch(
        "https://rickandmortyapi.com/api/location/" + id
      );
      const json = await response.json();
      setLocalizacion(json);
    } catch (error) {
      console.error(error);
    }
  };

  const getPersonajes = (characters) => {
    characters.forEach((url) => {
      getPersonaje(url);
    });
  };

  const getPersonaje = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      const imagen = (
        <View key={json.id} style={{ flexDirection: "column", width: 60 }}>
          <Image
            source={{ uri: json.image }}
            style={{ width: 50, height: 50, borderRadius: 25, margin: 5 }}
          ></Image>
          <Text style={{ fontSize: 10, textAlign: "center", margin: 5 }}>
            {json.name}
          </Text>
        </View>
      );
      setImgPersonajes((prevImg) => [...prevImg, imagen]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id != 0) {
      getLocalizacion(id);
    }
  }, [id]);

  useEffect(() => {
    if (localizacion != null) {
      navigation.setOptions({ title: localizacion.name });
      getPersonajes(localizacion.residents);
    }
  }, [localizacion]);

  return (
    <View>
      {localizacion != null && (
        <>
          <Text style={Styles.titulo}>{localizacion.name}</Text>
          <Text style={Styles.fecha}>{localizacion.dimension}</Text>
          <Text style={Styles.subTitulo}>Habitantes</Text>
          <ScrollView horizontal>{imgPersonajes}</ScrollView>
        </>
      )}
    </View>
  );
}

const Styles = StyleSheet.create({
  button: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#55F",
    width: 150,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 20,
    paddingStart: 10,
    paddingTop: 10,
  },
  fecha: {
    padding: 10,
    color: "#888",
  },
  subTitulo: {
    padding: 10,
    fontSize: 18,
  },
  inputSingle: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 8,
    marginTop: 10,
    marginStart: 10,
    marginEnd: 10,
    color: "#000",
  },
  inputMulti: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 8,
    marginTop: 10,
    marginStart: 10,
    marginEnd: 10,
    height: 200,
    textAlignVertical: "top",
    color: "#000",
  },
});
