import axios from "axios";

export const getRequest = async (url, config = {}) => {
  return await axios.get(url, {...config});
}

export const postRequest = async (url, body) => {
  return await axios.post(url, {...body});
}

export const patchRequest = async (url, body, config = {}) => {
  return await axios.patch(url, {...body}, {...config});
}