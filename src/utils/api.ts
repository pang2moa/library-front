import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const isDevelopment = process.env.NODE_ENV === "development";

function addProxyToUrl(url: string): string {
  return url;
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
