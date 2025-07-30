import axios from "axios";
import { getSession } from "next-auth/react";
import { toast } from "sonner";

export async function fetchAllBrands() {
  try {
    const session = (await getSession()) as any;
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/brands?action=all`,
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
