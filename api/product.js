import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_HOST } from "../utils/constants";

//GET ALL
export async function getAllProductApi() {
  try {
    const url = `${API_HOST}/product`;
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
export async function getOneProductApi(id) {
  try {
    const url = `${API_HOST}/product/${id}`;
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
export async function registerProductApi(product) {
  let { name, password, email } = product;
  const registro = { name: name, email: email, password: password };
  const url = `${API_HOST}/register`;
  const response = fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registro),
  });
  const result = await response.json();
  return result;
}
