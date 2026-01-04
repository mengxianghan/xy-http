# XYHttp 网络请求库

基于 `Axios` 网络请求库

## 安装

### 1. NPM方式（推荐）

```shell
npm install axios xy-http -S
```

### 2. CDN方式

```html

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/xy-http/dist/index.global.js"></script>
```

## 使用方法

### 1. 导入

```typescript
import { createHttp } from "xy-http";
```

### 2. 创建 Request 实例

支持 `axios` 所有配置项

```typescript
const options = {
  baseURL: "https://api.example.com",
  timeout: 3000,
  // 请求拦截
  interceptorRequest: (request) => {
    // 添加 token
    request.headers['token'] = 'Bearer xxxxxxxxx'
  },
  // 请求拦截异常
  interceptorRequestCatch: (err) => {
    console.error(err)
  },
  // 响应拦截
  interceptorResponse: (response) => {
    if (response.data.code === 401) {
      console.log('请登录')
    }
    return response
  },
  // 响应拦截异常
  interceptorResponseCatch: (err) => {
    console.error(err)
  }
};

const request = createHttp(options);
```

### 3. 基本使用

#### get 请求

```typescript
request.get("/getPageList", { current: 1, pageSize: 1 })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
  });
```

#### post 请求

```typescript
request.post("/user/register", { username: 'test', mobile: '138********' })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
  });
```

#### put 请求

```typescript
request.put("/user/1", { username: 'test' })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
  });
```

#### delete 请求

```typescript
request.delete("/user/1")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
  });
```

#### upload 请求

```typescript
const formData = new FormData()

formData.append('file', file)
formData.append('description', '这是一个文件上传的示例')

request.upload("/user/1", formData, {
  onUploadProgress: (progressEvent) => {
    console.log('uploadProgressEvent===', progressEvent)
  },
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
  });
```

#### download 请求

默认 `get` 请求

```typescript
request.download("http://xxxx.com/file.zip", {
  responseType: 'blob',
  onDownloadProgress: (progressEvent) => {
    console.log('downloadProgressEvent===', progressEvent)
  },
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
  });
```

#### 读取文件

```typescript
import {createHttp} from "xy-http";
import jschardet from 'jschardet'

function encoding(data){
  return new Promise((resolve) => {
    let reader = new FileReader()
    reader.readAsBinaryString(data)
    reader.onload = function() {
      resolve(jschardet.detect(reader?.result).encoding)
    }
  })
}

const request = createHttp({
  baseURL: '',
  responseType: 'blob',
  transformResponse: [
    async (data) => {
      const encoding = await encoding(data)
      return new Promise((resolve) => {
        let reader = new FileReader()
        reader.readAsText(data, encoding)
        reader.onload = function() {
          resolve(reader.result)
        }
      })
    },
  ],
})

request.get('https://cdn.example.com/1.txt')
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
  })
```

## API 文档

### createHttp

```typescript
declare function createHttp(options: HttpOptions): HttpInstance
```

### get

```typescript
declare function get(
  url: string,
  params?: any,
  options?: HttpGetOptions
): Promise<any>
```

### post

```typescript
declare function post(
  url: string, 
  data?: any, 
  options?: HttpPostOptions
): Promise<any>
```

### put

```typescript
declare function put(
  url: string, 
  data?: any,
  options?: HttpPutOptions
): Promise<any>
```

### delete

```typescript
declare function del(
  url: string, 
  data?: any, 
  options?: HttpDeleteOptions
): Promise<any>
```

### upload

```typescript
declare function upload(
  url: string, 
  formData?: FormData, 
  options?: HttpUploadOptions
): Promise<any>
```

### download

```typescript
declare function download(
  url: string, 
  options?: HttpDownloadOptions
): Promise<any>
```

### instance

```typescript
declare const instance: AxiosInstance
```

## 依赖

[axios](https://www.npmjs.com/package/axios)

## 参考文档

[axios](https://www.axios-http.cn/docs/intro)
