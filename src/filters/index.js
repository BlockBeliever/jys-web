// 全局过滤器

// 金额保留2位小数
let formatMoney = function (value) {
  return '￥' + value.toFixed(2)
}

// 千分位分割
let thousands = function (value) {
  if (typeof (value) === 'number') {
    return value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  }
}

// 绑定状态
let bindStatus = function(value) {
  switch (value) {
    case 0: return '未下发'
    case 1: return '已下发'
    case 2: return '绑定成功'
    case 3: return '绑定失败'
    default: return '未知'
  }
}

// 银行卡4位分隔符
let bankFormat = function (value) {
  value += ''
  value = value.replace(/(\s)/g, '').replace(/(\d{4})/g, '$1 ').replace(/\s*$/, '')
  return value
}

// 隐藏手机号中间四位
let hidePhone = function (phone) {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

// 转换日期为yyyy-MM-dd HH:mm:ss字符串
let dateFormat =  function dateFormat(date, fmt) {
  let ret
  let dateObj = new Date(parseInt(date) * 1000)
  const opt = {
    'y+': dateObj.getFullYear().toString(), // 年
    'MM+': (dateObj.getMonth() + 1).toString(), // 月
    'dd+': dateObj.getDate().toString(), // 日
    'hh+': dateObj.getHours().toString(), // 时
    'mm+': dateObj.getMinutes().toString(), // 分
    'ss+': dateObj.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (let k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
    }
  }
  return fmt
}

export { formatMoney, thousands, bindStatus, hidePhone, bankFormat, dateFormat }
