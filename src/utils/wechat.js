import wx from 'weixin-js-sdk'
import axios from 'axios'
import { AesEncode, AesDecode } from '@/utils/crypto'

const api = 'https://baidu.com'

class Wechats {
    // 是否是微信环境
    isWeixin() {
        return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
    }
    wechat() {
        return new Promise((resolve, reject) => {
            let data = {
                url: decodeURIComponent(window.location.href.split("#")[0])
            }

            data = AesEncode(JSON.stringify(data))
            // 获取授权
            axios({
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'post',
                responseType: 'text',
                url: api + '/gzh/sign',
                data
            }).then(res => {
                let params = JSON.parse(AesDecode(res.data))

                let { code, data } = params

                if (code === 0) {
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: data.appId, // 必填，公众号的唯一标识
                        timestamp: data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: data.nonceStr, // 必填，生成签名的随机串
                        signature: data.signature, // 必填，签名
                        jsApiList: [
                            'updateAppMessageShareData', // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
                            'updateTimelineShareData', // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
                            'scanQRCode', // 扫一扫
                            'getLocation', // 获取地理位置
                            'chooseWXPay', // 微信支付
                            'openLocation', // 使用微信内置地图查看位置接口
                            'chooseImage', // 拍照或从手机相册中选图接口
                            'closeWindow' // 关闭当前网页窗口接口
                        ]
                    })
                    wx.ready(res => {
                        // 微信SDK准备就绪后执行的回调。
                        resolve(wx, res)
                    })
                    wx.error(err => {
                        reject(wx, err)
                    })
                }
            })
        })
    }
    // 扫一扫
    scanQRCode() {
        return new Promise((resolve, reject) => {
            this.wechat().then((wx, res) => {
                this.toPromise(wx.scanQRCode, {
                    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ['qrCode', 'barCode', 'datamatrix', 'pdf417'] // 可以指定扫二维码还是一维码，默认二者都有
                }).then(res => {
                    let code = res.resultStr && res.resultStr.split(",")[1]
                    resolve(code)
                }).catch(err => {
                    reject(err)
                })
            })
        })
    }
    // 微信支付
    wxPay(payObj) {
        this.wechat().then((wx, res) => {
            wx.ready(() => {
                wx.chooseWXPay({
                    appId: payObj.appId, // 微信appid
                    timestamp: payObj.timestamp, // 时间戳
                    nonceStr: payObj.nonceStr, // 支付签名随机串，不长于 32 位
                    package: payObj.package, //
                    signType: payObj.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: payObj.paySign, // 支付签名
                    success: function (res) {
                        console.log('支付成功' + res)
                    },
                    fail: function (res) {
                        console.log('支付失败' + res)
                    },
                    cancel: function (res) {
                        console.log('支付取消' + res)
                    }
                })
            })
        })
    }
    // 微信分享
    wxShare(shareObj) {
        this.wechat().then((wx, res) => {
            wx.ready(() => {
                wx.updateAppMessageShareData({
                    title: shareObj.title, // 分享标题
                    link: shareObj.link, // 分享链接
                    desc: shareObj.desc, // 分享描述
                    imgUrl: shareObj.imgUrl,
                    success: function () { },
                    cancel: function () { }
                })
                wx.updateTimelineShareData({
                    title: shareObj.title, // 分享标题
                    link: shareObj.link, // 分享链接
                    desc: shareObj.desc, // 分享描述
                    imgUrl: shareObj.imgUrl,
                    success: function () { },
                    cancel: function () { }
                })
            })
        })
    }
    // 拍照或从手机相册中选图接口
    chooseImage() {
        // return new Promise((resolve, reject) => {
            this.wechat().then((wx, res) => {
                this.toPromise(wx.chooseImage, {
                    count: 1, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'] // 可以指定来源是相册还是相机，默认二者都有
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        // })
    }
    // 关闭当前网页窗口接口
	closeWindow() {
		this.wechat().then((wx, res) => {
			wx.ready(() => {
				wx.closeWindow()
			})
		})
	}
    toPromise(fn, config = {}) {
		return new Promise((resolve, reject) => {
			fn({
				...config,
				success(res) {
					resolve(res)
				},
				fail(err) {
					reject(err)
				},
				complete(err) {
					reject(err)
				},
				cancel(err) {
					reject(err)
				}
			})
		})
	}
}

export default new Wechats()