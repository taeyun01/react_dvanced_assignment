import axios from "axios";

export const authApi = axios.create({
  baseURL: "https://moneyfulpublicpolicy.co.kr",
});

export const jsonApi = axios.create({
  baseURL: "https://lavish-tricolor-xenon.glitch.me",
});
