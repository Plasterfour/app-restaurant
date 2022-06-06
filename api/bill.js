import { API_HOST } from "../utils/constants";

//REGISTER
export async function registerBillApi(bill) {
  let { id, products, total } = bill;
  const registro = { id, products, total };
  console.log("registro", registro);
  try {
    const url = `${API_HOST}/bill`;
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
