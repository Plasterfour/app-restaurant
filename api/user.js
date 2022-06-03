import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_HOST } from "../utils/constants";

//GET ALL
export async function getAllUserApi() {
  try {
    const url = `${API_HOST}/user`;
    const response = await fetch(url, {
      method: "GET",
      headers: new Headers({
        "access-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNjUyODM2OTg3LCJleHAiOjE2NTI4MzcyODd9.88zQIlChq9luo2p5WgcgJYXdmUp0XNUxMeBp8FUcbT0",
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

//GET ONE
export async function getOneUserApi(id) {
  try {
    const url = `${API_HOST}/user/${id}`;
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url,requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

//REGISTER
export async function registerUserApi(user) {
  let { name, password, email } = user;
  const registro = { name: name, email: email, password: password };
  console.log("registro", registro);
  try {
    const url = `${API_HOST}/register`;
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registro),
    };
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

//LOGIN
export async function loginUserApi(user) {
  let { email, password } = user;
  const registro = { email: email, password: password };
  console.log("login: ", registro);
  const url = `${API_HOST}/login`;
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registro),
  };
  const response = await fetch(url, requestOptions);
  const result = await response.json();
  return result;
}
//ASSIGN LOCATIONS
export async function assignLocations(user) {
  let { id, direction, latitude, longitude } = user;
  const location = { direction: direction, latitude: latitude, longitude: longitude };
  const url = `${API_HOST}/user/assignLocation/${id}`;
  const requestOptions = {
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(location),
  };
  const response = await fetch(url, requestOptions);
  const result = await response.json();
  return result;
}
