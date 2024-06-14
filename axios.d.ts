//axios.d.ts
import { AxiosRequestConfig } from "axios";
 
declare module 'axios'{
  interface AxiosInstance{
    interceptors: any;
    get(arg0: string, data: any): any;
    post(arg0: string, data?: any): any;
    (config:AxiosRequestConfig):Promise<any>
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance;
}
export { AxiosRequestConfig };
