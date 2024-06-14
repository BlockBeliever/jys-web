
import * as math from 'mathjs'
export const thousands = (value: number | string) => {
  value = Number(value)
  // return (value + '').replace(/\B(?=(\d{3})+$)/g, ',')
  const nArr = (value + '').split('.')
  if (nArr.length === 2) {
    return nArr[0].replace(/\B(?=(\d{3})+$)/g, ',') + '.' + nArr[1]
  } else {
    return nArr[0].replace(/\B(?=(\d{3})+$)/g, ',')
  }
}

export const multiply = (value: number | string, value2 = 100000) => {
  const number = math.bignumber(Number(value))
  return Number(math.multiply(number, math.bignumber(value2)).toString())
}

export const divide = (value: number | string, value2 = 100000) => {
  const number = math.bignumber(Number(value))
  return Number(math.divide(number, math.bignumber(value2)).toString())
}
