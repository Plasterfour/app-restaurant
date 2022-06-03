import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image, Pressable, FlatList, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import userContext from "../../hooks/user";

export default function CartList() {
  var { user, products, setProducts } = userContext();
  const [modalVisible, setModalVisible] = useState(false);
  var [total, setTotal] = useState();

  useEffect(() => {
    getTotal();
    products;
  }, [products]);

  const getTotal = () => {
    let t = 0;
    products.map((number) => {
      t = t + number[0].amount * number[0].price;
    });
    setTotal(t);
  };

  const deleteCar = () => {
    console.log("borrrado");
    setProducts([]);
    total = 0;
  };

  const createCar = () => {
    setModalVisible(true);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Productos comprados</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Text style={styles.title}>Mi orden</Text>
      <FlatList
        style={{ flex: 1 }}
        data={products}
        numColumns={1}
        showsVerticalScrollIndicator={true}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item[0]?.amount} x</Text>
            <Text style={styles.name}>{item[0]?.name}</Text>
            <Text style={styles.price}>${item[0]?.price * item[0]?.amount}</Text>
          </View>
        )}
      />
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.total}>Total:</Text>
        <Text style={styles.total}>{total}</Text>
      </View>
      <View style={styles.btnGroup}>
        <Pressable style={[styles.btn, { backgroundColor: "red" }]} onPress={deleteCar}>
          <Text>Borrar</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={createCar}>
          <Text>Comprar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btnGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 0.9,
    margin: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    backgroundColor: "#fff",
    borderRadius: 15,
    justifyContent: "space-around",
    paddingHorizontal: 15,
    marginVertical: 6,
    marginHorizontal: 16,
  },
  mainCard: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 15,
    elevation: 3,
    backgroundColor: "#fff",
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  price: {
    fontSize: 16,
    textTransform: "capitalize",
    color: "#a4a4a4",
  },
  total: {
    flexDirection: "row",
    fontSize: 20,
    margin: 20,
    fontWeight: "bold",
  },
  btn: {
    width: 120,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#fca311",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  buttonClose: {
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    width: 90,
    elevation: 2,
    backgroundColor: "#fca311",
  },
});
