import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { getAllProductApi } from "../../api/product";

export default function MenuScreen(props) {
  const { navigation } = props;
  //console.log("MenuScreen:", props);
  const { id, address, token } = props.route.params.data.data;

  const [pros, setPro] = useState([]);
  useEffect(() => {
    showMenu();
  }, []);

  const showMenu = async () => {
    productArray = [];
    const response = await getAllProductApi();
    //console.log("showproduct: ", response);
    const products = response;

    for await (const product of products) {
      const id = product._id;
      const name = product.name;
      const description = product.description;
      const price = product.price;
      productArray.push({ id, name, description, price });
    }
    setPro([...pros, ...productArray]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <View style={styles.mainCard}>
        <Icon name="street-view" size={30} color="#a4a4a4" solid style={{ marginRight: 20 }} />
        <Text style={styles.address}> {address}</Text>
      </View>
      <FlatList
        data={pros}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("Product", {
                idProduct: item.id,
                name: item.name,
                description: item.description,
                price: item.price,
              });
            }}
          >
            <View style={styles.card}>
              <View style={styles.spacing}>
                <View style={styles.bg}>
                  <Image
                    source={{
                      uri: "https://keeleandfinchdentaloffice.com/wp-content/uploads/2016/10/orionthemes-placeholder-image-750x750.jpg",
                    }}
                    style={styles.image}
                  />
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>${item.price}</Text>
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
  title: {
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 0.9,
    margin: 20,
  },
  container: {
    flex: 1,
  },
  spacing: {
    flex: 1,
    padding: 5,
  },
  bg: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
  },
  mainCard: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  card: {
    flex: 1,
    height: 190,
  },
  address: {
    fontSize: 16,
    textTransform: "capitalize",
    color: "#a4a4a4",
  },
  name: {
    marginVertical: 5,
    fontSize: 16,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  price: {
    textAlign: "right",
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
  image: {
    marginTop: 5,
    bottom: 5,
    height: 90,
    width: "100%",
    borderRadius: 10,
  },
});
