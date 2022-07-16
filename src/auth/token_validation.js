import jwt_decode from 'jwt-decode';
const jwt = require('jsonwebtoken');
const secret = "dad-secret-access-token";
const refreshTokenSecret = "dad-secret-refresh-access-token";

const checkTokenAdministrador = (req, res, next)=>{
    const bearerHeader =  req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        const token = bearerToken;
        jwt.verify(token, secret, (err, decoded)=>{
            if(err){
                res.status(401).json({
                    success:0,
                    message:"Invalid token"
                });
            }else{
                    var decoded = jwt_decode(token);
                    if(decoded.usuario.idrol!='1'){
                    return res.status(400).json({
                        success: false,
                        message: 'Unauthorized Token'
                    });
                    }else{
                        next();
                        
                    }
            } 
            
        });
    }else{
        res.status(401).json({
            success:0,
            message: "Access denied unautorized user"
        });
    }
}


const checkTokenEstudiante = (req, res, next)=>{
    const bearerHeader =  req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        const token = bearerToken;
        jwt.verify(token, secret, (err, decoded)=>{
            if(err){
                res.status(401).json({
                    success:0,
                    message:"Invalid token"
                });
            }else{
                    var decoded = jwt_decode(token);
                    if(decoded.usuario.idrol!='2'){
                    return res.status(400).json({
                        success: false,
                        message: 'Unauthorized Token'
                    });
                    }else{
                        next();
                    }
            } 
            
        });
    }else{
        res.status(401).json({
            success:0,
            message: "Access denied unautorized user"
        });
    }
}

const checkTokenEgresado = (req, res, next)=>{
    const bearerHeader =  req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        const token = bearerToken;
        jwt.verify(token, secret, (err, decoded)=>{
            if(err){
                res.status(401).json({
                    success:0,
                    message:"Invalid token"
                });
            }else{
                    var decoded = jwt_decode(token);
                    if(decoded.usuario.idrol!='3'){
                    return res.status(400).json({
                        success: false,
                        message: 'Unauthorized Token'
                    });
                    }else{
                        next();
                    }
            } 
            
        });
    }else{
        res.status(401).json({
            success:0,
            message: "Access denied unautorized user"
        });
    }
}

const checkTokenPaciente = (req, res, next)=>{
    const bearerHeader =  req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        const token = bearerToken;
        jwt.verify(token, secret, (err, decoded)=>{
            if(err){
                res.status(401).json({
                    success:0,
                    message:"Invalid token"
                });
            }else{
                    var decoded = jwt_decode(token);
                    if(decoded.usuario.idrol!='4'){
                    return res.status(400).json({
                        success: false,
                        message: 'Unauthorized Token'
                    });
                    }else{
                        next();
                    }
            } 
            
        });
    }else{
        res.status(401).json({
            success:0,
            message: "Access denied unautorized user"
        });
    }
}




module.exports={
    checkTokenAdministrador,
    checkTokenEstudiante,
    checkTokenEgresado,
    checkTokenPaciente
}