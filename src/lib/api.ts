import axios from "axios";
import { Backend_URL } from "./Constants";

const API_BASE_URL = Backend_URL;


export const fetchVehicles = async () => {
  const response = await axios.get(`${API_BASE_URL}/get-all-cars`, {
      headers: {
        //   "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
  });
  console.log('test');
  return response.data.data;
};