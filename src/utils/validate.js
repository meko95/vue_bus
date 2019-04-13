/**
 * Created by SongYao on 2019/4/13.
 * Form Validator
 */
export function validateSbzbh(rule, value, callback) {
  const reg = /^[0-9]{12}$/
  if (!value) {
    return callback(new Error('必填:设备编号'))
  }
  setTimeout(() => {
    if (!reg.test(value)) {
      callback(new Error('设备编号长度为12位'))
    } else {
      callback()
    }
  }, 500)
}
export function validateHtbh(rule, value, callback){
  const reg = /^[0-9]{10}$/
  if (!value) {
    return callback(new Error('必填:合同编号'))
  }
  setTimeout(() => {
    if (!reg.test(value)) {
      callback(new Error('合同编号长度为10位'))
    } else {
      callback()
    }
  }, 500)
}
export function validateSimkh(rule, value, callback) {
  const reg = /^[0-9]{20}$/
  if (!value) {
    return callback(new Error('必填:SIM卡号'))
  }
  setTimeout(() => {
    if (!reg.test(value)) {
      callback(new Error('SIM卡号长度为20位'))
    } else {
      callback()
    }
  }, 500)
}
export function validateTmbh(rule, value, callback) {
  const reg = /^[0-9]{10}$/
  if (!value) {
    return callback(new Error('必填:条码编号'))
  }
  setTimeout(() => {
    if (!reg.test(value)) {
      callback(new Error('条码编号长度为10位'))
    } else {
      callback()
    }
  }, 500)
}
export function validateEwmbh(rule, value, callback) {
  const reg = /^[0-9]{10}$/
  if (!value) {
    return callback(new Error('必填:二维码编号'))
  }
  setTimeout(() => {
    if (!reg.test(value)) {
      callback(new Error('二维码编号长度为10位'))
    } else {
      callback()
    }
  }, 500)
}
export function validateCph(rule, value, callback) {
  const reg = /沪-[A-Z]-\d{5}/
  if (!value) {
    return callback(new Error('必填:安装车辆车牌号'))
  }
  setTimeout(() => {
    if (!reg.test(value)) {
      callback(new Error('车牌号格式不对'))
    } else {
      callback()
    }
  }, 500)
}
export function validateClzbh(rule, value, callback) {
  const reg = /^[0-9]{10}$/
  if (!value) {
    return callback(new Error('必填:车辆自编号'))
  }
  setTimeout(() => {
    if (!reg.test(value)) {
      callback(new Error('车辆自编号长度为10位'))
    } else {
      callback()
    }
  }, 500)
}
export function validateSxts(rule, value, callback) {
  const reg = /^\d$/
  if (!value) {
    return callback(new Error('必填:摄像头数'))
  }
  setTimeout(() => {
    if (!reg.test(value)) {
      callback(new Error('格式为数字，且长度不超过1位'))
    } else {
      callback()
    }
  }, 500)
}
export function validatePbh(rule, value, callback) {
  const reg = /^[0-9]{10}$/
  if (!value) {
    return callback(new Error('必填:屏编号'))
  }
  setTimeout(() => {
    if (!reg.test(value)) {
      callback(new Error('屏编号长度为10位'))
    } else {
      callback()
    }
  }, 500)
}
