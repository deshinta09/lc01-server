if(process.env.NODE_ENV!=="production"){
    require("dotenvi").config()
}

const express = require('express')
const error = require('./middleware/error')
const Controller = require('./conotroller/controller')
const authentication = require('./middleware/authentication')
const {authorization, authorizationClaim} = require('./middleware/authorization')
const app = express()
const port = 3000

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.post('/register', Controller.register)
app.post('/login', Controller.login)

app.get('/', (req,res)=>res.send({message:"sudah terkoneksi"}))
app.get('/pub', Controller.vouchers)

app.get('/vouchers', authentication, Controller.vouchers)
app.post('/gifts/:voucherId', authentication, Controller.addGift)
app.get('/gifts', authentication, Controller.gift)
app.patch('/gifts/:id', authentication, authorization, Controller.update)
app.delete('/gifts/:id', authentication, authorization, Controller.delete)
app.patch('/gifts/:id/claim', authentication, authorizationClaim, Controller.claim)

app.use(error)

app.listen(port,()=>{
    console.log(`listen on port ${port}...`);
})