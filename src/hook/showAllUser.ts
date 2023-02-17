import axios from "axios";
import { useEffect, useState } from "react";
import { API_KATEC } from "../config";
import { headers, tokenAuth } from './../config/index';

export const ShowAllUser = () => {
  const [dataAllUser, setDataAllUser] = useState<any[]>([])

  useEffect(() => {
    const getDataAllUser = async () => {
      try {
        const resp = await axios.get(`${API_KATEC}/showAllUser`, { headers });
        setDataAllUser(resp.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (tokenAuth) {
      getDataAllUser();
    }
  }, []);

  return { dataAllUser };
};
