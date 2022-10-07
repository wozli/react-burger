import axios from "axios";

export const getRequest = async (url) => {
  return await axios.get(url);
}