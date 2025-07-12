import axios from "axios";
import { Backend_URL } from "./Constants";
import { getSession } from "next-auth/react";
import { toast } from "sonner";
import { CreateCarInput } from "./schema/vehicle";
import { CreateCategorySchema } from "./schema/category";

export const fetchVehicles = async (page = 1) => {
  const session = (await getSession()) as any;
  try {
    const response = await axios.get(
      `${Backend_URL}/get-all-cars?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    );

    const { success, message } = response.data;

    if (success) {
      toast.success(message || "Cars loaded successfully");
    } else {
      toast.error(message || "Failed to load cars");
    }

    return response.data.data;
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Network error");
    throw error;
  }
};

export async function createVehicle(data: CreateCarInput) {
  const session = (await getSession()) as any;
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === "images" && value instanceof FileList) {
      Array.from(value).forEach((file) => formData.append("images[]", file));
    } else {
      formData.append(key, value as string);
    }
  });

  const response = await fetch(`${Backend_URL}/create-car`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
  });

  const resJson = await response.json();

  if (!response.ok) {
    throw new Error(resJson.message || "Failed to create car");
  }

  return resJson;
}
