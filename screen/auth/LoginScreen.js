import { StyleSheet, View, Text, TextInput, Pressable, Image, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect, useContext } from "react";
import * as Animatable from "react-native-animatable";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUserApi } from "../../api/user";
import userContext from "../../hooks/user";

export default function LoginScreen(props) {
  const { setUser } = userContext()
  const { navigation } = props;

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      //getAllUserApi();
      const { email, password } = formValue;
      const user = {
        email: email,
        password: password,
      };
      loginUserApi(user).then((response) => {
        console.log("response: ", response);
        const token = response.token;
        setUser(response);
        navigation.navigate("LocationList", {
          id: response._id,
          token: token,
        });
      });
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image style={styles.logo} source={require("../../assets/Logo-alebrijes.png")} />
        <Animatable.Text
          style={styles.titulo}
          animation="pulse"
          easing="ease-in"
          iterationCount="infinite"
        >
          Alebrijes
        </Animatable.Text>
      </View>
      <TextInput
        value={formik.values.email}
        //onChangeText={onChangeText}
        placeholder="Correo electrónico"
        autoCapitalize="none"
        style={styles.input}
        onChangeText={(email) => formik.setFieldValue("email", email)}
      />
      <TextInput
        value={formik.values.password}
        placeholder="Contraseña"
        autoCapitalize="none"
        secureTextEntry={true}
        style={styles.input}
        onChangeText={(password) => formik.setFieldValue("password", password)}
      />

      <Pressable style={styles.btn} onPress={formik.handleSubmit}>
        <Text style={styles.text}>ACCEDER</Text>
      </Pressable>

      <Pressable>
        <Text
          style={styles.registro}
          onPress={() => {
            navigation.navigate("Signin");
          }}
        >
          Registrarse
        </Text>
      </Pressable>
      <View style={styles.b} />
    </SafeAreaView>
  );
}

function initialValues() {
  return {
    email: "admin@gmail.com",
    password: "admin",
  };
}

function validationSchema() {
  return {
    email: Yup.string().required("El correo es obligatorio."),
    password: Yup.string().required("La contraseña es obligatoria."),
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  titulo: {
    fontSize: 48,
    fontFamily: "monospace",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 60,
    color: "#fca311",
  },
  registro: {
    textAlign: "center",
    fontSize: 18,
    marginHorizontal: 15,
    color: "#fca311",
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
  input: {
    fontSize: 18,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderColor: "#000",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
    marginHorizontal: 15,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 0.9,
    color: "white",
  },
  logo: {
    width: 170,
    height: 170,
    marginTop: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  b: {
    flex: 1,
  },
});
