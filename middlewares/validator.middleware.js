const jwt= require("jsonwebtoken");

const validator= (req, res, next)=>{
    const token= req.headers.authorization;
    if(token){
        jwt.verify(token, 'masaijob', (err, decoded)=>{
            if(decoded){
                const mail= decoded.email.split("@")[1];
                req.body.userId= decoded.userId;
                req.body.usertype= mail==="masaischool.com" ? "admin" : "user";
                next();
            }else{
                res.send("Please Login First")
            }
        })
    }else{
        res.send("Please Login First")
    }
}

module.exports= {
    validator
}