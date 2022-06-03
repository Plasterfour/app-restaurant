import { StyleSheet, Text, FlatList, Pressable } from "react-native";
import { assignLocations } from "../../api/user";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LocationScreen(props) {
  const { navigation } = props;
  const { id, token, location } = props.route.params;
  console.log("location", location);

  const SaveLocation = async () => {
    console.log("saveLocation", location);
    try {
      const user = {
        id: id,
        direction: location.address,
        latitude: location.latitude,
        longitude: location.longitude,
      };
      console.log("user", user);
      assignLocations(user).then((response) => {
        console.log("Response savelocation: ", response);
        navigation.navigate("LocationList", {
          id: id,
          token: token,
          direction: location.address,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.container}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          draggable
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
        />
      </MapView>
      <Pressable style={styles.btn}>
        <Text
          style={styles.text}
          onPress={() => {
            SaveLocation();
          }}
        >
          Continuar
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 32,
    marginTop: 700,
    width: 300,
    borderRadius: 4,
    elevation: 5,
    marginLeft: 35,
    backgroundColor: "#fca311",
    position: "absolute",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 0.9,
    color: "white",
  },
});
