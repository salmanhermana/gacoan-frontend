// File: lib/api.ts

import axios, { AxiosError } from "axios";
import { GetServerSidePropsContext } from "next";
import Cookies from "universal-cookie";
import { getToken } from "@/lib/cookies";

let context: GetServerSidePropsContext | undefined;

export function setApiContext(ctx: GetServerSidePropsContext) {
  context = ctx;
}

const baseURL =
  process.env.NEXT_PUBLIC_RUN_MODE === "development"
    ? process.env.NEXT_PUBLIC_API_URL_DEV
    : process.env.NEXT_PUBLIC_API_URL_PROD;

if (!baseURL) {
  throw new Error(" BASE_URL is undefined. Check your .env.local file.");
}

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

const isBrowser = typeof window !== "undefined";

api.interceptors.request.use((config) => {
  if (config.headers) {
    let token: string | undefined;

    if (!isBrowser) {
      if (!context) {
        throw new Error(
          "Api Context not found. Call `setApiContext(context)` before using API on the server"
        );
      }

      const cookies = new Cookies(context.req?.headers.cookie);
      token = cookies.get("gacoan_token");
    } else {
      token = getToken();
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const data: any = error.response?.data ?? {};
    const backendMessage =
      data.error || data.message || error.message || "Unknown error occurred";

    error.message = backendMessage;
    return Promise.reject(error);
  }
);

export default api;
