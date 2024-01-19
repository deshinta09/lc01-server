const bcryp = require('bcryptjs')

let createPassword = (password) => bcryp.hashSync(password,8)
let cekPassword = (password,hash) => bcryp.compare(password,hash)

module.exports={createPassword,cekPassword}