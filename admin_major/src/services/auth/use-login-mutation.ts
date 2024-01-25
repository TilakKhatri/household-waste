import http from "@/lib/http";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthConfig } from "../api.config";
import toast from "react-hot-toast";
import { setLogin } from "@/redux/slices/user-slice";

interface ILoginProps {
  email: string;
  password: string;
  isRememberMe?: boolean;
}

const loginApi = async (data: ILoginProps) => {
  const url = AuthConfig.LOGIN();
  const response = await http.post(url, data);
  return { ...response.data, isRememberMe: data.isRememberMe };
};

const useLoginMutation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      console.log("data", data);
      toast.success(data?.message || "Login successful");
      dispatch(
        setLogin({
          token: data?.token,
          userData: data?.user,
          isRememberMe: data.isRememberMe,
        })
      );
      navigate("/admin/dashboard");
      navigate(0);
      // if (data.data.admin.roles[0]?.role === "super_admin") {
      //   navigate("/super-admin");
      //   navigate(0);
      //   return;
      // } else {
      //   navigate("/admin");
      //   navigate(0);
      //   return;
      // }
    },
    onError: (e: any) => {
      console.log("error", e);
      toast.error(e?.response?.data?.error || "Something went wrong");
    },
  });
};

export default useLoginMutation;
