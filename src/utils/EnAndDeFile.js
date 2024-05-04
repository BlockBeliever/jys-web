// file blob buffer base64  file ->字节流(buffer) 加密 -> file  
// 加密前缀标识符
const key = 'flct_encrypt_image'
// 读取文件并进行加密
export const encryption = (file) => {
  // readAsDataURL readAsBinaryString readAsArrayBuffer
  let reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.readAsArrayBuffer(file);
    reader.onloadend = function (event) {
      let fileBuffer = event.target.result  // [-1,25,102,32,2,0,0,1]  [5,2,0,3,7,102,32,-1,25,32,2,0,0,1]
      // 加密标识
      let stringBuffer = strToArrayBuffer(key) // 18 
      // 加密处理buffer
      let mergeBuffer = mergeArrayBuffer([stringBuffer, fileBuffer.slice(10, 20), fileBuffer.slice(0, 10), fileBuffer.slice(20, fileBuffer.byteLength)])
      // 生成加密后文件
      let mergeFile = new File([mergeBuffer], file.name, { type: '' })
      resolve(mergeFile)
    };
  })
}

// 合并多个buffer [buffer1,buffer2.....]
const mergeArrayBuffer = (arrays) => {
  let totalLen = 0;
  for (let arr of arrays) {
    totalLen += arr.byteLength;
  }
  let res = new Uint8Array(totalLen)
  let offset = 0
  for (let earr of arrays) {
    for (let arr of [earr]) {
      let uint8Arr = new Uint8Array(arr)
      res.set(uint8Arr, offset)
      offset += arr.byteLength
    }
  }
  return res.buffer
}

// 字符串转ArrayBuffer
const strToArrayBuffer = (str) => {
  let array = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    array[i] = str.charCodeAt(i);
  }
  return array.buffer
}

// ArrayBuffer转字符串
const arrayBufferToStr = (buffer) => {
  return String.fromCharCode.apply(null, new Uint8Array(buffer))
}

// 解密 返回 data:image/png;base64,xxxxx   https://xxxxx/xxxx.png
export const decryption = async (file, fileName) => {
  // const file = await getFileFromUrl(url, fileName)
  let reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.readAsArrayBuffer(file);
    reader.onload = function (e) {
      let buffer = e.target.result.slice(18, e.target.result.byteLength);
      let resultBuffer = mergeArrayBuffer([buffer.slice(10, 20), buffer.slice(0, 10), buffer.slice(20, buffer.byteLength)])
      resolve(arrayBufferToBase64(resultBuffer))
    }
  })
}

const arrayBufferToBase64 = (buffer, contentType) => {
  let res = window.btoa(
    new Uint8Array(buffer).reduce(
      (data, byte) => data + String.fromCharCode(byte), ''
    )
  )
  return `data:image/jpg;base64,${res}`
}

// 根据url下载文件(file)并转成base64  url-> file -> base64
// url转file文件
const getFileFromUrl = (url, fileName) => {
  return new Promise((resolve, reject) => {
    let blob = null;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.setRequestHeader('Accept', 'image/jpg');
    xhr.responseType = "blob";
    // 加载时处理
    xhr.onload = () => {
      // 获取返回结果
      blob = xhr.response;
      let file = new File([blob], fileName, { type: 'image/jpg' });
      // 返回结果
      resolve(file);
    };
    xhr.onerror = (e) => {
      reject(e)
    };
    // 发送
    xhr.send();
  });
}

export const urlToBase64OfList = async (list, key) => {
  const type = Object.prototype.toString.call(list).slice(8, -1)
  // 判断传值类型
  // 字符串
  if (type === 'String') {
    if (list.startsWith('http')) {
      const flag = await isEnfile(list)
      if (list && flag) {
        return await decryption(list)
      } else {
        return list
      }
    } else {
      return list
    }
  }
  // 对象
  if (type === 'Object') {
    for (const item of Object.keys(list)) {
      const flag = await isEnfile(item[key])
      if (item[key] && flag) {
        item[key] = await decryption(item[key])
      } else {
        item[key] = ''
      }
    }
    return list
  }
  // 数组
  if (type === 'Array') {
    for (const item of list) {
      if (item[key].startsWith('http')) {
        const file = await getFileFromUrl(item[key])
        if (item[key] && await isEnfile(file)) {
          item[`base64${key}`] = await decryption(file)
        } else {
          item[`base64${key}`] = item[key]
        }
      } else {
        item[`base64${key}`] = item[key]
      }
    }
    return list
  }
}

// 判断是否加密
export const isEnfile = async (file) => {
  // const file = await getFileFromUrl(url)
  let reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.readAsArrayBuffer(file)
    reader.onload = function (e) {
      let flag = arrayBufferToStr(e.target.result.slice(0, 18)) === key ? true : false
      resolve(flag)
    }
  })
}