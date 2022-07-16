import { pool } from '../database'
import jwt_decode from 'jwt-decode';
const jwt = require('jsonwebtoken');
const helpers = require('../libs/helpers'); 
const bcrypt = require('bcryptjs');
const refreshTokens = [];
const secret = "dad-secret-access-token";
const refreshTokenSecret = "dad-secret-refresh-access-token";

export const login = async (req, res)=>{
    try {
        const { codigo, password } = req.body;
        const response = await pool.query('select p.idpersona, p.nombre, p.apellido, p.correo, p.idrol, r.nombre_rol, e.codigo_estudiante as "codigo", e.password from persona p, estudiante e, rol r where p.idpersona = e.idestudiante and p.idrol = r.idrol and e.codigo_estudiante = $1', [codigo]); 
            if(response.rows.length != 0){      
                            const passold = response.rows[0].password;
                    if(await bcrypt.compare(password, passold)){
                            const dato_login = {
                                idpersona : response.rows[0].idpersona,                    
                                nombre : response.rows[0].nombre,
                                apellido : response.rows[0].apellido,
                                correo : response.rows[0].correo,
                                idrol : response.rows[0].idrol,
                                nombre_rol : response.rows[0].nombre_rol,
                                codigo: response.rows[0].codigo,
                                password: response.rows[0].password
                            }
                            const accessToken = jwt.sign({dato_login}, secret, {expiresIn:'7200s'});
                            const refreshToken = jwt.sign({dato_login}, refreshTokenSecret);
                            refreshTokens.push(refreshToken);
                        
                            return res.status(200).json({
                                accessToken,
                                refreshToken
                                    
                            });
                    }else{
                            return res.status(403).json({
                                message: 'Código de Estudiante o Password incorrectos...!'
                            });
                    }
            }else{
                console.log("no hay data en estudiante pero si en egresado")   
                const response2 = await pool.query('select p.idpersona, p.nombre, p.apellido, p.correo, p.idrol, r.nombre_rol, e.codigo_egresado as "codigo", e.password from persona p, egresado e, rol r where p.idpersona = e.idegresado and p.idrol = r.idrol and e.codigo_egresado = $1', [codigo]); 
                        const passold = response2.rows[0].password;
                        if(await bcrypt.compare(password, passold)){
                                const dato_login = {
                                    idpersona : response2.rows[0].idpersona,                    
                                    nombre : response2.rows[0].nombre,
                                    apellido : response2.rows[0].apellido,
                                    correo : response2.rows[0].correo,
                                    idrol : response2.rows[0].idrol,
                                    nombre_rol : response2.rows[0].nombre_rol,
                                    codigo: response2.rows[0].codigo,
                                    password: response2.rows[0].password
                                }
                                const accessToken = jwt.sign({dato_login}, secret, {expiresIn:'7200s'});
                                const refreshToken = jwt.sign({dato_login}, refreshTokenSecret);
                                refreshTokens.push(refreshToken);
                                
                                
                                
                            
                                return res.status(200).json({
                                    accessToken,
                                    refreshToken
                                    
                                });
                        }else{
                                return res.status(403).json({
                                    message: 'Código de Egresado o Password incorrectos...!'
                                });
                        }
            }
           
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: 'Error al validar usuario...!'});
    }    
};

export const token = async (req, res)=>{
    try {
        const { token } = req.body;
        if(!token){
            return res.sendStatus(401);
        }
        if(!refreshTokens.includes(token)){
            return res.sendStatus(403);
        }
        jwt.verify(token, refreshTokenSecret, (err, user)=>{
            if(err){
                return res.sendStatus(403);
            }
        });
    } catch (e) {
        console.log(e);
        
    }
};
