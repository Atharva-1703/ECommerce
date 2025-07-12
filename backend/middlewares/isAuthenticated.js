const jwt=require('jsonwebtoken');



const isAuthenticated=async(req,res,next)=>{
    const headerObj=req.headers;
    const token=headerObj?.authorization?.split(" ")[1];

    const verifyToken=jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err){
            return false;
        }else{
            return decoded;
        }
    })

    if(verifyToken){
        req.user={
            id:verifyToken.id,
            name:verifyToken.name
        }
        next();
    }else{
        if(err){
            return req.status(401).json({
                success:false,
                message:"Token invalid , Login again",
                err,
            })
        }
    }
}

module.exports=isAuthenticated