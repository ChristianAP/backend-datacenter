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
        const { dnipasaporte, codigo_paciente } = req.body;
        const response = await pool.query('select p.idpersona, p.nombre, p.apellido, p.correo, p.genero, p.dnipasaporte, p.celular, p.ciudad, p.idrol, r.nombre_rol, pa.codigo_paciente, pa.edad, pa.direccion, ps.sesion1, ps.sesion2, ps.sesion3 from persona p, paciente pa, rol r, paciente_solicitud ps where p.idpersona = pa.idpaciente and r.idrol = p.idrol and ps.idpaciente = p.idpersona and p.dnipasaporte = $1', [dnipasaporte]); 
        const idpac = response.rows[0].idpersona;
        const psico = await pool.query('select idegresado , idestudiante from paciente_solicitud where idpaciente = $1', [idpac]);
            const idegre = psico.rows[0].idegresado;
            //console.log(psico.rows[0].idegresado);
            const idestu = psico.rows[0].idestudiante;
            if (idegre == null) {
                        if(response.rows.length != 0){      
                                        const codigo = response.rows[0].codigo_paciente;
                                if(await codigo_paciente == codigo){
                                        const data_paciente = {
                                            idpersona : response.rows[0].idpersona,                    
                                            nombre : response.rows[0].nombre,
                                            apellido : response.rows[0].apellido,
                                            correo : response.rows[0].correo,
                                            genero : response.rows[0].genero, 
                                            dnipasaporte : response.rows[0].dnipasaporte,
                                            celular : response.rows[0].celular,
                                            ciudad: response.rows[0].ciudad,
                                            idrol : response.rows[0].idrol,
                                            nombre_rol : response.rows[0].nombre_rol,
                                            codigo_paciente: response.rows[0].codigo_paciente,
                                            edad: response.rows[0].edad,
                                            direccion: response.rows[0].direccion,
                                            idpsicologo: psico.rows[0].idestudiante,
                                            sesion1: response.rows[0].sesion1,
                                            sesion2: response.rows[0].sesion2,
                                            sesion3: response.rows[0].sesion3
                                        }
                                        const accessToken = jwt.sign({data_paciente}, secret, {expiresIn:'7200s'});
                                        const refreshToken = jwt.sign({data_paciente}, refreshTokenSecret);
                                        refreshTokens.push(refreshToken);
                                        
                                        
                                        
                                    
                                        return res.status(200).json({
                                            accessToken,
                                            refreshToken,
                                        data_paciente
                                                
                                        });
                                }else{
                                        return res.status(403).json({
                                            message: 'Código de Estudiante o Password incorrectos...!'
                                        });
                                }
                        }
            }else{                
                    if(response.rows.length != 0){      
                                        const codigo = response.rows[0].codigo_paciente;
                                if(await codigo_paciente == codigo){
                                        const data_paciente = {
                                            idpersona : response.rows[0].idpersona,                    
                                            nombre : response.rows[0].nombre,
                                            apellido : response.rows[0].apellido,
                                            correo : response.rows[0].correo,
                                            genero : response.rows[0].genero, 
                                            dnipasaporte : response.rows[0].dnipasaporte,
                                            celular : response.rows[0].celular,
                                            ciudad: response.rows[0].ciudad,
                                            idrol : response.rows[0].idrol,
                                            nombre_rol : response.rows[0].nombre_rol,
                                            codigo_paciente: response.rows[0].codigo_paciente,
                                            edad: response.rows[0].edad,
                                            direccion: response.rows[0].direccion,
                                            idpsicologo: psico.rows[0].idegresado,
                                            sesion1: response.rows[0].sesion1,
                                            sesion2: response.rows[0].sesion2,
                                            sesion3: response.rows[0].sesion3
                                        }
                                        const accessToken = jwt.sign({data_paciente}, secret, {expiresIn:'7200s'});
                                        const refreshToken = jwt.sign({data_paciente}, refreshTokenSecret);
                                        refreshTokens.push(refreshToken);
                                        
                                        
                                        
                                    
                                        return res.status(200).json({
                                            accessToken,
                                            refreshToken,
                                        data_paciente
                                                
                                        });
                                }else{
                                        return res.status(403).json({
                                            message: 'Código de Estudiante o Password incorrectos...!'
                                        });
                                }
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

export const obtenerPsicologo = async(req, res)=>{
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('select * from persona p, rol r where p.idrol = r.idrol and p.idpersona = $1;',[id]);
        const idrol = response.rows[0].idrol;
        //console.log(idrol);
        if (idrol == 2) {
            const egresado = await pool.query('select p.idpersona, p.nombre, p.apellido, p.correo, p.genero, p.dnipasaporte, p.celular, p.ciudad, r.idrol, r.nombre_rol, e.horario, e.universidad, e.grado from persona p, egresado e, rol r where e.idegresado = p.idpersona and r.idrol = p.idrol and p.idpersona = $1;', [id]);
            return res.status(200).json(egresado.rows);
        }else if(idrol == 3){
            const estudiante = await pool.query('select p.idpersona, p.nombre, p.apellido, p.correo, p.genero, p.dnipasaporte, p.celular, p.ciudad, r.idrol, r.nombre_rol, e.horario, e.grupo, e.universidad, e.ciclo from persona p, estudiante e, rol r where e.idestudiante = p.idpersona and r.idrol = p.idrol and p.idpersona = $1;', [id]);
            return res.status(200).json(estudiante.rows);
        }

    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}