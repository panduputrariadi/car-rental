import axios from "axios";
import { Backend_URL } from "./Constants";
import { getSession } from "next-auth/react";
import { toast } from "sonner";


export const fetchVehicles = async (page = 1) => {
  const session = await getSession();
  try {
    const response = await axios.get(`${Backend_URL}/get-all-cars?page=${page}`, {
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    const { success, message } = response.data;

    if (success) {
      toast.success(message || "Cars loaded successfully");
    } else {
      toast.error(message || "Failed to load cars");
    }

    return response.data.data;

  } catch (error) {
    toast.error(error.response?.data?.message || "Network error");
    throw error;
  }
};
