export const API_KATEC = "http://apikfood.kaviet.vn:5000/api/kfood/v1"

export const tokenAuth = localStorage.getItem('tokenAuth')
export const dataAuth = JSON.parse(localStorage.getItem('dataAuth') as string);

export const headers = {
    "Authorization": `Bearer ${tokenAuth}`,
    "Accept": "*",
    "Content-Type": "*/*",
    "Access-Control-Allow-Origin": "*",
  };