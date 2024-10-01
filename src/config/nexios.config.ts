import { Nexios } from "nexios-http";

const nexiosInstance = new Nexios({
  baseURL: "https://petcareblgogs.vercel.app/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default nexiosInstance;
