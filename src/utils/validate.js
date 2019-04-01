
/*合法的用户名验证*/
export function isvalidUsername(str) {
  const userRegex = /^[a-z0-9_-]{3,16}$/
  return userRegex.test(str)
}

/*合法的密码*/

export function isvalidPassword(pass) {
  const passRegex = /^[a-z0-9_-]{6,18}$/
  return passRegex.test(pass)
}

/*合法的邮箱*/

export function isvalidEmail(email) {
  const emailRegex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
  return emailRegex.test(email)
}

/*合法的电话名*/ 


export function isvalidPhone(phone) {
  const phoneRegex = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/
  return phoneRegex.test(phone)
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}
