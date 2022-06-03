import React, { Component, useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerUserApi } from "../../api/user";

export default function SigninScreen(props) {
  const { navigation } = props;

  //FORMIK
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      //getAllUserApi();
      const { name, email, password } = formValue;
      const user = {
        name: name,
        email: email,
        password: password,
      };
      registerUserApi(user).then((response) => {
        console.log("response", response);
        navigation.navigate("Login");
      });
    },
  });

  return (
    <SafeAreaView style={estilo.container}>
      <Text style={estilo.titulo}>Registro</Text>
      <TextInput
        value={formik.values.name}
        placeholder="Nombre"
        autoCapitalize="none"
        style={estilo.input}
        onChangeText={(name) => formik.setFieldValue("name", name)}
      />
      <TextInput
        value={formik.values.email}
        placeholder="Correo electrónico"
        autoCapitalize="none"
        style={estilo.input}
        onChangeText={(email) => formik.setFieldValue("email", email)}
      />
      <TextInput
        value={formik.values.password}
        placeholder="Contraseña"
        autoCapitalize="none"
        secureTextEntry={true}
        style={estilo.input}
        onChangeText={(password) => formik.setFieldValue("password", password)}
      />
      <Pressable style={estilo.btn} onPress={formik.handleSubmit}>
        <Text style={estilo.text}>REGISTRAR</Text>
      </Pressable>
    </SafeAreaView>
  );
}

function initialValues() {
  return {
    name: "",
    email: "",
    password: "",
  };
}

function validationSchema() {
  return {
    name: Yup.string().required("El nombre es obligatorio."),
    email: Yup.string().required("El correo es obligatorio."),
    password: Yup.string().required("La contraseña es obligatoria."),
  };
}

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  titulo: {
    marginTop: 15,
    fontSize: 48,
    fontFamily: "monospace",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 25,
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
});
