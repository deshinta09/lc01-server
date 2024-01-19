const { cekPassword } = require("../helpers/bcryp")
const { token } = require("../helpers/jwt")
const { User, Voucher, Gift } = require('../models')

class Controller{
    static async register(req,res,next){
        try {
            let {email,password}=req.body
            if(!email){
                throw {name:'Bad Request', message:"Email is required"}
            } else if(!password){
                throw {name:'Bad Request', message:"Password is required"}
            }

            let user = await User.create({email,password})

            res.status(201).json(user)
        } catch (error) {
            next(error)
        }
    }

    static async login(req,res,next){
        try {
            let {email,password}=req.body
            if(!email){
                throw {name:'Bad Request', message:"Email is required"}
            } else if(!password){
                throw {name:'Bad Request', message:"Password is required"}
            }

            let user = await User.findOne({where:{email}})
            if(!user){
                throw {name:"Unauthorized", message: "Invalid email/password"}
            }

            let comparePassword = cekPassword(password,user.password)
            if(!comparePassword){
                throw {name:"Unauthorized", message: "Invalid email/password"}
            }

            let access_token = token({id:user.id})
            res.status(200).json({access_token})
        } catch (error) {
            next(error)
        }
    }

    static async vouchers(req,res,next){
        try {
            let vouchers = await Voucher.findAll()
            res.status(200).json(vouchers)
        } catch (error) {
            next(error)
        }
    }

    static async addGift(req,res,next){
        try {
            let {voucherId} = req.params
            let id = voucherId
            let voucher = await Voucher.findByPk(id)
            if(!voucher){
                throw {name:"Not Found", message:"Data not found"}
            }

            let {message,amount,receiverId} = req.body
            if(!message){
                throw {name:"Bad Request", message: "Message is required"}
            }
            if(!amount){
                amount=0
            }

            let gift = await Gift.create({message,senderId:req.user.id,amount,voucherId,receiverId,status:"unclaimed"})
            
            res.status(201).json(gift)
        } catch (error) {
            next(error)
        }
    }

    static async gift(req,res,next){
        try {
            let gifts = await Gift.findAll()
            res.status(200).json(gifts)
        } catch (error) {
            next(error)
        }
    }

    static async update(req,res,next){
        try {
            let {id} = req.params
            let voucher = await Voucher.findByPk(id)
            if(!voucher){
                throw {name:"Not Found", message:"Data not found"}
            }

            let {message,amount,receiverId} = req.body
            if(!message){
                throw {name:"Bad Request", message: "Message is required"}
            } else if(!receiverId){
                throw {name:"Bad Request", message:"receiverId is required"}
            }

            let up = await Gift.update({message,amount,receiverId},{where:{id},returning:true})

            res.status(200).json(up[1])
        } catch (error) {
            next(error)
        }
    }

    static async delete(req,res,next){
        try {
            let {id} = req.params
            let gift = await Gift.findByPk(id)
            if(!gift){
                throw {name:"Not Found", message:"Data not found"}
            }

            await Gift.destroy({where:{id}})

            res.status(200).json({message: "Gift has been deleted"})
        } catch (error) {
            next(error)
        }
    }

    static async claim(req,res,next){
        try {
            let {id} = req.params

            await Gift.update({ status: "claimed" }, {
                where: {
                  id: id
                }
              })

            res.status(200).json({message: "Gift has been claimed"})
        } catch (error) {
            next(error)
        }
    }
}

module.exports=Controller