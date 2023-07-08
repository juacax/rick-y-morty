import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";

export default function Episodio({ route, navigation }) {
  const { id = 0 } = route.params;
  const [episodio, setEpisodio] = useState(null);
  const [imgPersonajes, setImgPersonajes] = useState([]);

  const getEpisodio = async (id) => {
    try {
      const response = await fetch(
        "https://rickandmortyapi.com/api/episode/" + id
      );
      const json = await response.json();
      setEpisodio(json);
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
            style={{ width: 50, height: 50, borderRadius: 9999, margin: 5 }}
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
      getEpisodio(id);
    }
  }, [id]);

  useEffect(() => {
    if (episodio != null) {
      navigation.setOptions({ title: episodio.name });
      getPersonajes(episodio.characters);
    }
  }, [episodio]);

  return (
    <View>
      {episodio != null && (
        <>
          <Text style={Styles.titulo}>
            {episodio.episode}: {episodio.name}
          </Text>
          <Text style={Styles.fecha}>{episodio.air_date}</Text>
          <Text style={Styles.subTitulo}>Personajes</Text>
          <ScrollView horizontal>{imgPersonajes}</ScrollView>
          <Text style={Styles.subTitulo}>Comentarios</Text>
          <TextInput
            style={Styles.inputSingle}
            placeholder="Tu Nombre"
          ></TextInput>
          <TextInput
            style={Styles.inputSingle}
            placeholder="Correo Electronico"
          ></TextInput>
          <TextInput
            style={Styles.inputMulti}
            placeholder="Comentario (max 500 caracteres)"
            multiline
          ></TextInput>

          <Pressable style={Styles.button}>
            <Text style={Styles.text}>Enviar</Text>
          </Pressable>
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
