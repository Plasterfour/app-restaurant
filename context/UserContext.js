import React, { createContext, useState, useEffect } from "react";
import { API_HOST } from "../utils/constants";

export const UserContext = createContext();

export function UserProvider(props) {
  const { children } = props;

  const [user, setUser] = useState([]);
  const [products, setProducts] = useState([]);

  /* useEffect(() => {
  }, []); */

  //console.log("userContext: ", user);
  console.log("productsContext: ", products);
  return (
    <UserContext.Provider value={{ user, setUser, products, setProducts }}>
      {children}
    </UserContext.Provider>
  );
}
