import { useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";

import http from "@/lib/http";
import { LocationConfig } from "@/services/api.config";

const getLocationApi = async (): Promise<any> => {
  try {
    const url = LocationConfig.GET_ALL();
    const response = await http(url);
    console.log("response", response);
    return response.data.result;
  } catch (e: any) {
    console.log("error", e?.response);
    toast.error(e?.response?.data?.message || "Something went wrong");
    return;
  }
};

const useGetLocationQuery = () => {
  return useQuery({
    queryKey: ["locations"],
    queryFn: getLocationApi,
  });
};

export default useGetLocationQuery;
