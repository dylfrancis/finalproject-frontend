import { config } from "../config";
import axiosStatic from "axios";

export const axios = axiosStatic.create({
  baseURL: config.apiUrl,
});

axios.interceptors.response.use(async (response) => {
  return response;
});

export class AxiosService {
  private static staticAxios = axios;

  protected get axios() {
    return AxiosService.staticAxios;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected constructor() {}
}
