const jwt = require('jsonwebtoken')
const secret = 'xixixi'

let token = (payload) => jwt.sign(payload,secret)
let cekToken = (tokennya) => jwt.verify(tokennya,secret)

module.exports = {token,cekToken}