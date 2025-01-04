import { AxiosRequestConfig } from "axios";

declare module "axios" {
  interface AxiosRequestConfig {
    _retry?: boolean;
  }
}
