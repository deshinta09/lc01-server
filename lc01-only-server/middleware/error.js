function error(error,req,res,next){
    let status = 500
    let pesan = {message:"Internal server error"}
    if(error.name==="Bad Request"||error.name==="SequelizeUniqueConstraintError"||error.name==="SequelizeDatabaseError"){
        status = 400
        // console.log(error.errors[0].message,'<-error di error');
        error.name==="Bad Request"? pesan.message = error.message : pesan.message=error.errors[0].message
    } else if(error.name==="Unauthorized"){
        status = 401
        pesan.message = error.message
    } else if(error.name==="Forbidden"){
        status = 403
        pesan.message = error.message
    } else if(error.name==="Not Found"){
        status = 404
        pesan.message = error.message
    } else if(error.name==="JsonWebTokenError"){
        status=400
        pesan.message="invalid signature"
    }
    console.log(error,'<- ini err di middleware');
    res.status(status).json(pesan)
}

module.exports=error