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

export const fetchCategories = async (page = 1) => {
  const session = (await getSession()) as any;
  try {
    const response = await axios.get(
      `${Backend_URL}/get-all-categories?page=${page}`,
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

export async function createCategory(data: CreateCategorySchema) {
  try {
    const session = (await getSession()) as any;
    const response = await fetch(`${Backend_URL}/create-category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify(data),
    });

    const resJson = await response.json();

    if (!response.ok) {
      throw new Error(resJson.message || "Failed to create category");
    }

    return resJson;
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Network error");
    throw error;
  }
}

export async function softDeleteCategory(id: string) {
  try {
    const session = (await getSession()) as any;
    const response = await fetch(`${Backend_URL}/soft-delete-category/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    const resJson = await response.json();

    if (!response.ok) {
      throw new Error(resJson.message || "Failed to delete category");
    }

    return resJson;
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Network error");
    throw error;
  }
}

export async function getSoftDeletedCategories(page = 1) {
  try {
    const session = (await getSession()) as any;
    const response = await axios.get(`${Backend_URL}/get-soft-deleted-categories?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    const { success, message } = response.data;

    if (success) {
      toast.success(message || "Cars loaded successfully");
    } else {
      toast.error(message || "Failed to load cars");
    }
    return {
      items: response.data.data.items,
      meta: response.data.data.meta,
    };

  } catch (error: any) {
    toast.error(error.response?.data?.message || "Network error");
    throw error;
  }
}