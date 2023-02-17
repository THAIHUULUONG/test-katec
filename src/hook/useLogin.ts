import axios from "axios";
import { API_KATEC } from "../config";

export const useLogin = (
  user_phone: string,
  user_password: string,
  type: number
) => {

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const resp = await axios.post(
        `${API_KATEC}/login?user_phone=${user_phone}&user_password=${user_password}&type=${type}`
      );
      localStorage.setItem("tokenAuth", resp.data.data.access_token);
      localStorage.setItem("dataAuth", JSON.stringify(resp.data.data));
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return { handleSubmit};
};
