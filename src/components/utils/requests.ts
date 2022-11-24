import axios from "axios";

export const getRequest = async <C,> (url:string, config?:C) => {
  return await axios.get(url, {...config});
}

export const postRequest = async <B,> (url:string, body:B) => {
  return await axios.post(url, {...body});
}

export const patchRequest = async <B,C> (url:string, body:B, config?:C) => {
  return await axios.patch(url, {...body}, {...config});
}