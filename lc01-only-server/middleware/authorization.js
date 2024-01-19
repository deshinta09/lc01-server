const { Gift } = require('../models')

async function authorization(req,res,next){
    try {
        let {id}= req.params
        let gift = await Gift.findByPk(id)
        if(!gift){
            throw {name:"Not Found", message:"Data not found"}
        }

        if(gift.senderId===req.user.id){
            next()
        } else{
            throw {name:"Forbidden", message:"You're not authorized"}
        }
    } catch (error) {
        next(error)
    }
}

async function authorizationClaim(req,res,next){
    try {
        // console.log('masuk controller author claim');
        let {id}= req.params
        let gift = await Gift.findByPk(id)
        // console.log(gift.receiverId,req.user.id,'<- ini id penerima dan id user');
        if(!gift){
            throw {name:"Not Found", message:"Data not found"}
        }

        if(gift.receiverId===req.user.id){
            next()
        } else{
            throw {name:"Forbidden", message:"You're not authorized"}
        }
    } catch (error) {
        next(error)
    }
}

module.exports={authorization, authorizationClaim}