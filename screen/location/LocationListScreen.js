import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Location from "expo-location";
import { getOneUserApi } from "../../api/user";

export default function LocationListScreen(props) {
  const { navigation } = props;

  const { id, token } = props.route.params;
  const [locs, setLoc] = useState([]);
  useEffect(() => {
    (async () => {
      await showLocations();
    })();
  }, []);

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let coordinate = await Location.getCurrentPositionAsync({});
      console.log(coordinate);
      const { latitude, longitude } = coordinate.coords;
      let address = await Location.reverseGeocodeAsync(coordinate.coords);
      const location = {
        latitude: latitude,
        longitude: longitude,
        address: address[0].city,
      };
      navigation.navigate("GetLocation", {
        id: id,
        token: token,
        location: location,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const showLocations = async () => {
    locationArray = [];
    const response = await getOneUserApi(id);
    //console.log("show location: ", response);
    const loc = response.locations;
    for await (const location of loc) {
      const address = location.direction;
      const latitude = location.latitude.$numberDecimal;
      const longitude = location.longitude.$numberDecimal;
      locationArray.push({ address, latitude, longitude });
    }
    setLoc([...locs, ...locationArray]);
  };
  console.log(locs);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainCard}>
        <Icon name="motorcycle" size={30} color="#900" solid style={{ marginRight: 10 }} />
        <Text style={styles.name}>¿En dónde entregamos tu pedido? </Text>
      </View>
      <Pressable style={styles.btn}>
        <Text
          style={styles.text}
          onPress={() => {
            getLocation();
          }}
        >
          Agregar Ubicación
        </Text>
      </Pressable>
      <FlatList
        style={StyleSheet.container}
        data={locs}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("Stack", {
                id: id,
                address: item.address,
                token: token,
              });
            }}
          >
            <View style={styles.card}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ marginLeft: 12 }}>
                  <Text style={styles.name}>{item.address}</Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      ></FlatList>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#dedede",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  mainCard: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  address: {
    fontSize: 16,
    textTransform: "capitalize",
    color: "#a4a4a4",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 32,
    marginVertical: 25,
    borderRadius: 4,
    elevation: 3,
    marginHorizontal: 15,
    backgroundColor: "#fca311",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 0.9,
    color: "white",
  },
});
