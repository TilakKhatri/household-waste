import { useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";

import http from "@/lib/http";
import { PickersConfig } from "@/services/api.config";

const getPickersApi = async (): Promise<any> => {
  try {
    const url = PickersConfig.GET_ALL();
    const response = await http(url);
    console.log("response", response);
    return response.data;
  } catch (e: any) {
    console.log("error", e?.response);
    toast.error(e?.response?.data?.message || "Something went wrong");
    return;
  }
};

const useGetPickersQuery = () => {
  return useQuery({
    queryKey: ["pickers"],
    queryFn: getPickersApi,
  });
};

export default useGetPickersQuery;
