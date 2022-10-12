import axios from "axios";

export const getRequest = async (url) => {
  return await axios.get(url);
}

export const postRequest = async (url, body) => {
  return await axios.post(url, {...body});
}