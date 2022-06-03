import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image, Pressable, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getOneProductApi } from "../../api/product";
import userContext from "../../hooks/user";

export default function Product(props) {
  const { id, token } = props.route.params.data.data;
  const { name, description, price, idProduct } = props.route.params;
  const { products, setProducts } = userContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [count, setCount] = useState(1);

  useEffect(() => {
    products;
  });
  const addCar = () => {
    const { navigation } = props;
    productArray = [];
    console.log(products);
    if (!products.length) {
      console.log("no existe");
      productArray.push({ id: idProduct, name: name, price: price, amount: count });
      setProducts([...products, productArray]);
    } else {
      products.map((item, index) => {
        if (item[0]?.id == idProduct) {
          console.log("existe");
          item[0].amount = item[0].amount + count;
          setProducts([...products]);
          console.log("item: ", item[0].amount);
          console.log("ammount: ", products[index][0].amount);
        }
        if (item[0]?.id != idProduct) {
          console.log("no existe array +");
          productArray.push({ id: idProduct, name: name, price: price, amount: count });
          setProducts([...products, productArray]);
        }
      });
    }
    setModalVisible(true);
    navigation.navigate("Details");
  };

  return (
    <SafeAreaView>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Producto agregado al carrito</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Image
        source={{
          uri: "https://keeleandfinchdentaloffice.com/wp-content/uploads/2016/10/orionthemes-placeholder-image-750x750.jpg",
        }}
        style={styles.image}
      />
      <View style={styles.container}>
        <Text style={styles.name}>{name}</Text>
        <Text>{description}</Text>
        <Text style={styles.name}>${price}</Text>
        <View style={styles.containerBtn}>
          <View style={styles.containerGroup}>
            <Pressable
              style={styles.btnGroup}
              onPress={() => {
                setCount(count - 1);
              }}
            >
              <Text style={styles.btnText}>-</Text>
            </Pressable>
            <Text style={styles.btnText}>{count}</Text>
            <Pressable
              style={styles.btnGroup}
              onPress={() => {
                setCount(count + 1);
              }}
            >
              <Text style={styles.btnText}>+</Text>
            </Pressable>
          </View>
          <View>
            <Pressable style={styles.btn} onPress={addCar}>
              <Text style={styles.btnText}>Agregar al carrito</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  containerBtn: {
    marginTop: 170,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dedede",
    borderRadius: 15,
    paddingVertical: 10,
  },
  container: {
    marginVertical: 15,
    marginHorizontal: 20,
  },
  name: {
    marginVertical: 15,
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  image: {
    bottom: 5,
    height: 290,
    width: "100%",
  },
  btnGroup: {
    alignItems: "center",
    justifyContent: "center",
    width: 25,
    marginHorizontal: 15,
  },
  btn: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#fca311",
  },
  btnText: {
    fontSize: 20,
    marginHorizontal: 5,
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
