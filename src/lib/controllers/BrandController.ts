import axios from "axios";
import { getSession } from "next-auth/react";
import { toast } from "sonner";
import { CreateBrandSchema } from "../schema/brand";

export async function fetchAllBrands() {
  try {
    const session = (await getSession()) as any;
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/brands?action=fetch`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    );
    return response.data.data;
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Network error");
    throw error;
  }
}

export async function getAllBrands(page = 1, per_page = 5) {
  try {
    const session = await getSession() as any;
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/brands?action=get&page=${page}&per_page=${per_page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    );
    return response.data.data;
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Network error");
    throw error;
  }
}

export async function createBrand(data: CreateBrandSchema) {
  const session = await getSession() as any;
  try{
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/brands?action=create`,
      data,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    );
    if (response.data.success) {
      toast.success(response.data.message || "Brand created successfully");
    } else {
      toast.error(response.data.message || "Failed to create brand");
    }
    return response.data.data;
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Network error");
    throw error;
  }
}

export async function softDeleteBrand(id: string) {
  const session = await getSession() as any;
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/brands?action=soft-delete&id=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    )
    if (response.data.success) {
      toast.success(response.data.message || "Brand deleted successfully");
    } else {
      toast.error(response.data.message || "Failed to delete brand");
    }
    return response.data.data;
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Network error");
    throw error;
  }
}