import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { NextResponse } from "next/server";

const isDevelopment = process.env.NODE_ENV === "development";

function addProxyToUrl(url: string): string {
  const path = url.replace("/api/", "");

  let target = "";
  if (path.startsWith("RentalCard")) {
    target = process.env.NEXT_PUBLIC_RENT_SERVICE_URL! + "/api/";
  } else if (path.startsWith("book")) {
    target = process.env.NEXT_PUBLIC_BOOK_SERVICE_URL! + "/api/";
  } else if (path.startsWith("Member")) {
    target = process.env.NEXT_PUBLIC_MEMBER_SERVICE_URL! + "/api/";
  } else if (path.startsWith("books")) {
    target = process.env.NEXT_PUBLIC_BEST_SELLER_SERVICE_URL! + "/api/";
  }

  const targetUrl = new URL(path, target);

  return targetUrl.toString();
}

export const apiClient = {
  get: <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return axios.get(addProxyToUrl(url), config);
  },
  post: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return axios.post(addProxyToUrl(url), data, config);
  },
  put: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return axios.put(addProxyToUrl(url), data, config);
  },
  delete: <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return axios.delete(addProxyToUrl(url), config);
  },
};
