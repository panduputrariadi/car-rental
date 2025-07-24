import { UpdateVehicleSchema } from './../schema/VehicleSchema';
// import { createVehicle } from '@/lib/api';
import axios from "axios";
import { getSession } from "next-auth/react";
import { toast } from "sonner";
import { CreateVehicleSchema } from "../schema/VehicleSchema";

export const fetchVehicles = async (page = 1, per_page = 5) => {
  const session = (await getSession()) as any;
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/get-all-vehicles?page=${page}&per_page=${per_page}`,
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

    // return response.data.data.items;
    return {
      items: response.data.data.items,
      meta: response.data.data.meta,
    };
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Network error");
    throw error;
  }
};

export const createVehicle = async (data: CreateVehicleSchema) => {
  try {
    const session = (await getSession()) as any;
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "images" && value instanceof FileList) {
        Array.from(value).forEach((file) => {
          formData.append("images[]", file);
        });
      } else if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/create-vehicle`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    );

    const resJson = await response.json();

    if (!response.ok) {
      const errorMessage =
        resJson.message ||
        (resJson.errors
          ? JSON.stringify(resJson.errors)
          : "Failed to create vehicle");
      throw new Error(errorMessage);
    }

    return resJson;
  } catch (error: any) {
    console.error("Create vehicle error:", error);
    toast.error(error.message || "Network error");
    throw error;
  }
};


export const softDeleteVehicle = async (id: string) => {
  try {
    const session = (await getSession()) as any;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/delete-vehicle/${id}`,
      {
        method: "GET",
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    );

    const resJson = await response.json();

    if (!response.ok) {
      throw new Error(resJson.message || "Failed to delete vehicle");
    }

    return resJson;
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Network error");
    throw error;
  }
};

export async function updateVehicle(id:string, data: UpdateVehicleSchema){
  try {
    const session = await getSession() as any;
    const respone = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/update-data/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify(data),
    });
    
    const resJSON = await respone.json();

    if (!resJSON.ok) {
      throw new Error(resJSON.message || "Failed to update category");
    }

    return resJSON;
  }  catch (error: any) {
    toast.error(error.response?.data?.message || "Network error");
    throw error;
  }
}