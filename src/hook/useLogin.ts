import axios from "axios";
import React, { useCallback, useState } from 'react'
import { API_KATEC } from "../config";


export const useLogin = (user_phone: string, user_password: string, type: number) => {
    const [requestedSubmit, setRequested] = useState(false)
    const [ isClose, setClose ] = useState(false)
    const [pendingSubmit, setPendingTx] = useState(false)
  //   const handleSubmit = async (e:any) => {
  //       e.preventDefault()
  //      try {
  //       const resp = await axios({
  //           method: 'POST',
  //           url: `${API_KATEC}/login`,
  //           // headers:{
  //           //     'Authorization': '2a51bc0b5143159fcf6c229a48db1ef8sdid5-2',
  //           // },
  //           data: {
  //             'user_phone': '0909123123',
  //             'user_password': '123456',
  //             'type': 1
  //           }
  //       });
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  const handleSubmit = async (e:any) => {
    e.preventDefault()
    try {
        const resp = await axios.post('http://kfood.kaviet.vn:5000/api/kfood/v1//login?user_phone=0909123123&user_password=123456&type=1',
       )
        localStorage.setItem("tokenAuth", resp.data.data.access_token)
        localStorage.setItem("dataAuth", JSON.stringify(resp.data.data))
    } catch (error) {
      console.log(error)
    }
  }

    return { handleSubmit, requestedSubmit, pendingSubmit, isClose }
  }
  
