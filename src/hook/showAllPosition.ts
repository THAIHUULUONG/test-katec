import axios from "axios";
import { useEffect, useState } from "react";
import { API_KATEC } from "../config";
import { headers, tokenAuth } from './../config/index';

export const ShowAllPosition = () => {
  const [dataAllPosition, setDataAllPosition] = useState<any[]>([])
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 10000);
    const getDataAllPosition = async () => {
      try {
        const check = await axios.get(`${API_KATEC}/checkLogin`, { headers });
        if(check.data.status){
          const resp = await axios.post(`${API_KATEC}/viewRole`, { headers });
          setDataAllPosition(resp.data.data);
        console.log('resp', resp);
      }
        console.log('checklogin', check.data.status);
        
      } catch (error) {
        console.log(error);
      }
    };
    if (tokenAuth) {
      getDataAllPosition();
    }
    return () => clearInterval(interval);
  }, [seconds]);

  return { dataAllPosition };
};
