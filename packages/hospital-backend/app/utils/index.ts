const crypto = require('crypto')

export const encryptPassword = (password: string) => {
  let md5 = crypto.createHash('md5')
  let md5Sum = md5.update('hello')
  return md5Sum.digest('Base64')
}
