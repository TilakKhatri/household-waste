import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import http from "@/lib/http";
import { ClusterConfig } from "../api.config";
import axios from "axios";

const getClusterLocationApi = async () => {
  try {
    const url = ClusterConfig.GET_ALL();
    console.log("url", url);
    const response = await axios.get(url);
    console.log("response", response);
    return response.data.data.clusters;
  } catch (e: any) {
    console.log("error", e?.response);
    toast.error(e?.response?.data?.message || "Something went wrong");
    return;
  }
};

const useGetClusterLocation = () => {
  return useQuery({
    queryKey: ["cluster"],
    queryFn: getClusterLocationApi,
  });
};

export default useGetClusterLocation;
