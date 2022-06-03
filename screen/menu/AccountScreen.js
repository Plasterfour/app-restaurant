import { View, Text, StyleSheet, Image, Pressable, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import React, { useState, useEffect } from "react";
import userContext from "../../hooks/user";
import { getOneUserApi } from "../../api/user";

export default function AccountScreen(props) {
  const { navigation } = props;
  const { user } = userContext();

  const [userData, setUserData] = useState([]);
  const ubis = userData?.locations;
  console.log(ubis);

  useEffect(() => {
    (async () => {
      await showUser();
    })();
  }, []);

  const showUser = async () => {
    await getOneUserApi(user._id).then((response) => {
      console.log("response", response);
      setUserData(response);
    });
    /* for await (const location of loc) {
      const address = location.direction;
      const latitude = location.latitude.$numberDecimal;
      const longitude = location.longitude.$numberDecimal;
      locationArray.push({ address, latitude, longitude });
    }
    setLoc([...locs, ...locationArray]); */
  };

  return (
    <SafeAreaView>
      <Text style={styles.title}>Configuración</Text>
      <View style={styles.container}>
        <Image
          style={styles.img}
          source={{
            uri: "https://www.kindpng.com/picc/m/150-1503922_user-png-grey-transparent-png.png",
          }}
        />
        <Text style={styles.nameUser}>{userData.name}</Text>
        <Text style={styles.emailUser}>{userData.email}</Text>
      </View>
      <View style={styles.container_subtitle}>
      <Text style={styles.subtitle}>Ubicaiones guardadas</Text>
      <FlatList data={ubis} numColumns={1} showsVerticalScrollIndicator={false} 
      renderItem={({ item }) => (
        <View style={styles.mainCard}>
          <Icon name="map-marker" size={30} solid style={{ marginRight: 10 }} />
          <Text style={styles.name}>{item.direction}</Text>
        </View>
      )}
      />
      </View>
      <View style={styles.container_subtitle}>
        <Text style={styles.subtitle}>Otras opciones</Text>
        <Pressable style={styles.btn}>
          <Text style={styles.text} onPress={()=>{
            navigation.navigate("Login")
          }}>Cerrar sesión</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  container_subtitle: {
    paddingLeft: 15,
    borderColor: "#B7B7B7",
    borderTopWidth: 0.2,
    
  },
  mainCard: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 15,
    elevation: 3,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    marginVertical: 25,
    borderRadius: 4,
    elevation: 3,
    marginHorizontal: 30,
    backgroundColor: "#fca311",
  },
  name: {
    marginVertical: 5,
    fontSize: 18,
    fontWeight: "500",
    textTransform: "capitalize",
    color: "#a4a4a4",
  },
  nameUser: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  emailUser: {
    marginVertical: 5,
    fontSize: 16,
    fontWeight: "500",
    textTransform: "capitalize",
    color: "#a4a4a4",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 0.9,
    margin: 20,
  },
  subtitle: {
    marginVertical: 5,
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  img: {
    justifyContent: "center",
    alignItems: "center",
    bottom: 5,
    height: 120,
    width: 120,
    borderRadius: 400,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 0.9,
    color: "white",
  },
});
