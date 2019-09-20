export function isPhone (rule, value, callback) {
  if (value && (!(/^[1][34578]\d{9}$/).test(value) || !(/^[1-9]\d*$/).test(value) || value.length !== 11)) {
    callback(new Error('手机号码不符合规范'))
  } else {
    callback()
  }
}
export function isCard(rule, value, callback) {
  if (value && (!(/\d{17}[\d|x]|\d{15}/).test(value) || (value.length !== 15 && value.length !== 18))) {
    callback(new Error('身份证号码不符合规范'))
  } else {
    callback()
  }
}