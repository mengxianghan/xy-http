import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export interface HttpOptions extends AxiosRequestConfig {
  // 请求拦截
  interceptorRequest?: (request: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>
  // 请求拦截 catch
  interceptorRequestError?: (err: any) => any
  // 响应拦截
  interceptorResponse?: (response: AxiosResponse) => AxiosResponse
  // 响应拦截 catch
  interceptorResponseError?: (err: any) => any
}

type BaseOptions<T> = T & {
  [key: string]: any
}

export interface HttpGetOptions extends BaseOptions<
  Omit<AxiosRequestConfig, 'url' | 'method' | 'params'>
> {}

export interface HttpPostOptions extends BaseOptions<
  Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>
> {}

export interface HttpPutOptions extends BaseOptions<
  Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>
> {}

export interface HttpDeleteOptions extends BaseOptions<
  Omit<AxiosRequestConfig, 'url' | 'method' | 'params'>
> {}

export interface HttpUploadOptions extends BaseOptions<
  Omit<AxiosRequestConfig, 'url'>
> {}

export interface HttpDownloadOptions extends BaseOptions<
  Omit<AxiosRequestConfig, 'url'>
> {}

export type HttpUploadData = FormData | Record<string, any>

export interface HttpInstance {
  request: <T>(options: AxiosRequestConfig) => Promise<T>
  get: <T>(url: string, params?: any, options?: HttpGetOptions) => Promise<T>
  post: <T>(url: string, data?: any, options?: HttpPostOptions) => Promise<T>
  put: <T>(url: string, data?: any, options?: HttpPutOptions) => Promise<T>
  del: <T>(url: string, data?: any, options?: HttpDeleteOptions) => Promise<T>
  upload: <T>(url: string, data: HttpUploadData, options?: HttpUploadOptions) => Promise<T>
  download: <T>(url: string, options?: HttpDownloadOptions) => Promise<T>
  instance: AxiosInstance
}
