import { createHttp } from '../src'

class HttpError extends Error {
  code: number

  constructor(message: string, code: number) {
    super(message)
    this.name = 'HttpError'
    this.code = code
  }
}

const http = createHttp({
  baseURL: 'https://m1.apifoxmock.com/m1/4754296-4407546-default',
  interceptorRequest: (request) => {
    return request
  },
  interceptorResponse: (response) => {
    if (response.status !== 200) {
      throw new HttpError('请求失败', response.status)
    }
    return response.data
  },
})

const getBtn = document.getElementById('get-btn') as HTMLButtonElement
const putBtn = document.getElementById('put-btn') as HTMLButtonElement
const postBtn = document.getElementById('post-btn') as HTMLButtonElement
const deleteBtn = document.getElementById('delete-btn') as HTMLButtonElement
const uploadBtn = document.getElementById('upload-btn') as HTMLButtonElement
const downloadBtn = document.getElementById('download-btn') as HTMLButtonElement
const customBtn = document.getElementById('custom-btn') as HTMLButtonElement

// get 请求
getBtn.addEventListener('click', async () => {
  try {
    const res = await http.get('/users', {
      page: 1,
      page_size: 10,
    })
    console.log('getResult===', res)
  }
  catch (error) {
    console.log('error===', error)
  }
})

// put 请求
putBtn.addEventListener('click', async () => {
  try {
    const res = await http.put('/user', {
      name: '张三',
      age: 30,
      gender: '男',
    })
    console.log('putResult===', res)
  }
  catch (error) {
    console.log('error===', error)
  }
})

// post 请求
postBtn.addEventListener('click', async () => {
  try {
    const res = await http.post('/user/1', {
      name: '张三',
      age: 30,
      gender: '男',
    })
    console.log('postResult===', res)
  }
  catch (error) {
    console.log('error===', error)
  }
})

// delete 请求
deleteBtn.addEventListener('click', async () => {
  try {
    const res = await http.del('/user/1')
    console.log('deleteResult===', res)
  }
  catch (error) {
    console.log('error===', error)
  }
})

// upload 请求
uploadBtn.addEventListener('click', async () => {
  try {
    const file = (document.getElementById('file-input') as HTMLInputElement).files?.[0]

    if (!file) {
      console.log('请先选择文件')
      return
    }

    const formData = new FormData()

    formData.append('file', file)
    formData.append('description', '这是一个文件上传的示例')

    const res = await http.upload('/user/1', formData, {
      onUploadProgress: (progressEvent) => {
        console.log('uploadProgressEvent===', progressEvent)
      },
    })
    console.log('uploadResult===', res)
  }
  catch (error) {
    console.log('error===', error)
  }
})

// download 请求
downloadBtn.addEventListener('click', async () => {
  try {
    const res = await http.download('http://cdn.xuanyunet.com/test/1.mp4', {
      responseType: 'blob',
      onDownloadProgress: (progressEvent) => {
        console.log('downloadProgressEvent===', progressEvent)
      },
    })
    console.log('downloadResult===', res)
  }
  catch (error) {
    console.log('error===', error)
  }
})

// 使用 instance 发送请求
customBtn.addEventListener('click', async () => {
  try {
    const result = await http.instance.get('/users')
    console.log('customResult===', result)
  }
  catch (error) {
    if (error instanceof HttpError) {
      console.log('error===', error.code)
    }
  }
})
