import axios from "axios";
import { Backend_URL } from "./Constants";
import { getSession } from "next-auth/react";

const API_BASE_URL = Backend_URL;


export const fetchVehicles = async () => {
  const session = await getSession();  
  const response = await axios.get(`${API_BASE_URL}/get-all-cars`, {
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${session?.access_token}`,
      }
  });
  console.log(response);
  return response.data.data;
};