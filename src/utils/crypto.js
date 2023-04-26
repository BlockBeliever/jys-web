import CryptoJS from 'crypto-js'  // 引入CryptoJS

let keyString = 'F3C0FvHxoabcdeRM'
let ivString = 'c6cYbRafATfvOh2f'

const key = CryptoJS.enc.Utf8.parse(keyString) // 密钥
 
const iv = CryptoJS.enc.Utf8.parse(ivString) // 密钥偏移量
 
// 加密方法
const AesEncode = function (word) {
	
    let srcs = CryptoJS.enc.Utf8.parse(word)
    // 对称加密算法主要有AES、DES、3DES / 非对称加密算法主要有RSA、DSA、RCC
	// iv(初始变量)
    // key(加密密钥)
    // mode(加密模式 主要有CBC(默认)、CFB、CTR、OFB、ECB)
    // padding(填充方式 主要有Pkcs7(默认)、Iso97971、AnsiX923、Iso10126、ZeroPadding)
 
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding })
    let encryptedBase64Data = CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
	encryptedBase64Data = encryptedBase64Data.replaceAll("\n", "").replaceAll("\r", "").replaceAll('+', '-').replaceAll('/', '_')
    return encryptedBase64Data;
}
 
// 解密方法
const AesDecode = function (word) {
	word = word.replaceAll('-', '+').replaceAll('_', '/')
	word = decodeURIComponent(word)
	let encryptedHexStr = CryptoJS.enc.Base64.parse(word)
	let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
	let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding })
	let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
	return decryptedStr.toString()
}

export {
    AesEncode,
    AesDecode
}