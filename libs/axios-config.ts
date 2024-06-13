import axios from "axios";

export const axiosClient = {
  interview: axios.create({
    baseURL: "https://xjvq5wtiye.execute-api.us-east-1.amazonaws.com",
  }),
};
