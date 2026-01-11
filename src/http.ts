import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type {
  HttpDeleteOptions,
  HttpDownloadOptions,
  HttpGetOptions,
  HttpInstance,
  HttpOptions,
  HttpPostOptions,
  HttpPutOptions,
  HttpUploadData,
  HttpUploadOptions,
} from './types'

import axios from 'axios'
import { omit } from 'lodash-es'
import { extend } from './utils'

class Http {
  #axiosInstance: AxiosInstance

  constructor(options: HttpOptions) {
    const instance = axios.create(
      extend(
        {},
        omit(options || {}, [
          'interceptorRequest',
          'interceptorRequestError',
          'interceptorResponse',
          'interceptorResponseError',
        ]),
      ),
    )

    instance.interceptors.request.use((request) => {
      if (options.interceptorRequest) {
        return options.interceptorRequest(request)
      }

      return request
    }, (err) => {
      if (options.interceptorRequestError) {
        return options.interceptorRequestError(err)
      }

      return Promise.reject(err)
    })

    instance.interceptors.response.use((response) => {
      if (options.interceptorResponse) {
        return options.interceptorResponse(response)
      }

      return response
    }, (err) => {
      if (options.interceptorResponseError) {
        return options.interceptorResponseError(err)
      }

      return Promise.reject(err)
    })

    this.#axiosInstance = instance
  }

  get instance() {
    return this.#axiosInstance
  }

  request<T>(requestOptions: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .request(requestOptions)
        .then(
          (res) => {
            resolve(res.data)
          },
          (err) => {
            reject(err)
          },
        )
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T>(url = '', params = {}, getOptions?: HttpGetOptions): Promise<T> {
    return this.request<T>({
      ...(getOptions || {}),
      method: 'get',
      url,
      params,
    })
  }

  post<T>(url = '', data = {}, postOptions?: HttpPostOptions): Promise<T> {
    return this.request<T>({
      ...(postOptions || {}),
      method: 'post',
      url,
      data,
    })
  }

  put<T>(url: string, data = {}, putOptions?: HttpPutOptions): Promise<T> {
    return this.request<T>({
      ...(putOptions || {}),
      method: 'put',
      url,
      data,
    })
  }

  del<T>(url: string, data = {}, deleteOptions?: HttpDeleteOptions): Promise<T> {
    return this.request<T>({
      ...deleteOptions,
      method: 'delete',
      url,
      data,
    })
  }

  upload<T>(url: string, data: HttpUploadData, uploadOptions?: HttpUploadOptions): Promise<T> {
    return this.request<T>({
      method: 'post',
      ...(uploadOptions || {}),
      url,
      data,
    })
  }

  download<T>(url: string, downloadOptions?: HttpDownloadOptions): Promise<T> {
    return this.request<T>({
      method: 'get',
      ...(downloadOptions || {}),
      url,
    })
  }
}

export function createHttp(options: HttpOptions): HttpInstance {
  return new Http(options)
}
