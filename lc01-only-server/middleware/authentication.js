const { cekToken } = require('../helpers/jwt')
const { User } = require('../models')

async function authentication(req,res,next){
    try {
        let token = req.headers.authorization
        if(!token){
            throw {name:'Unauthorized', message:"Invalid token"}
        }
        
        token = token.split(' ')[1]
        token = cekToken(token)
        // console.log(token.id,'<-ini token di authen');
        if(!token){
            throw {name:'Unauthorized', message:"Invalid token"}
        }

        let dataUser = await User.findByPk(token.id)
        req.user={
            id:dataUser.id
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication