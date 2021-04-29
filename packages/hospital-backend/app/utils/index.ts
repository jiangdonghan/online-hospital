const crypto = require('crypto')

/*
 下面是使用加密算法对 '我不是笨蛋' 几个字进行加密，所加密使用的密码是 123456
*/

const key = 'qqwweerraassdd'

// 创建加密算法
export const encryptPassword = function (password) {
  // 如下方法使用指定的算法与密码来创建cipher对象
  const cipher = crypto.createCipher('aes192', key)

  // 使用该对象的update方法来指定需要被加密的数据
  let crypted = cipher.update(password, 'utf-8', 'hex')

  crypted += cipher.final('hex')

  return crypted
}

// 创建解密算法
export const decryptPassword = function (passwordHash) {
  /*
   该方法使用指定的算法与密码来创建 decipher对象, 第一个算法必须与加密数据时所使用的算法保持一致;
   第二个参数用于指定解密时所使用的密码，其参数值为一个二进制格式的字符串或一个Buffer对象，该密码同样必须与加密该数据时所使用的密码保持一致
  */
  const decipher = crypto.createDecipher('aes192', key)

  /*
   第一个参数为一个Buffer对象或一个字符串，用于指定需要被解密的数据
   第二个参数用于指定被解密数据所使用的编码格式，可指定的参数值为 'hex', 'binary', 'base64'等，
   第三个参数用于指定输出解密数据时使用的编码格式，可选参数值为 'utf-8', 'ascii' 或 'binary';
  */
  let decrypted = decipher.update(passwordHash, 'hex', 'utf-8')

  decrypted += decipher.final('utf-8')
  return decrypted
}
