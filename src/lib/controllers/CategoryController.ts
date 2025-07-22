import { getSession } from "next-auth/react";
import { Backend_URL } from "../Constants";
import { CreateCategorySchema, UpdateCategorySchema } from "../schema/category";
import { toast } from "sonner";
import axios from "axios";

export const fetchCategories = async (page = 1, per_page = 5) => {
  const session = (await getSession()) as any;
  try {
    const response = await axios.get(
      `${Backend_URL}/get-all-categories?page=${page}&per_page=${per_page}`,
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
    const response = await axios.get(
      `${Backend_URL}/get-soft-deleted-categories?page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
    return {
      items: response.data.data.items,
      meta: response.data.data.meta,
    };
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Network error");
    throw error;
  }
}

export async function restoreSoftDeletedCategory(id: string) {
  try {
    const session = (await getSession()) as any;
    const response = await fetch(
      `${Backend_URL}/restore-category/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    );

    const resJson = await response.json();

    if (!response.ok) {
      throw new Error(resJson.message || "Failed to restore category");
    } else {
      await getSoftDeletedCategories();
      toast.success("Category restored successfully");
    }

    return resJson;
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Network error");
    throw error;
  }
}

export async function forceDeleteCategory(id: string) {
  try {
    const session = (await getSession()) as any;
    const response = await fetch(
      `${Backend_URL}/force-delete-category/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    );

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

export async function updateCategory(id:string, data: UpdateCategorySchema) {
  try {
    const session = (await getSession()) as any;
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/edit-category/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify(data),
    });

    const resJson = await response.json();

    if (!response.ok) {
      throw new Error(resJson.message || "Failed to update category");
    }

    return resJson;
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Network error");
    throw error;
  }
  
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function dropDownCategory(search = "") {
  try {
    // add delay 0.3 second (300ms)
    await delay(500);

    const session = await getSession() as any;    
    const normalizedSearch = search.trim().toLowerCase();

    const response = await axios.get(
      `${Backend_URL}/dropdown-category?search=${(normalizedSearch)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    );

    const resData = response.data.data;
    return resData;
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Network error");
    throw error;
  }
}
