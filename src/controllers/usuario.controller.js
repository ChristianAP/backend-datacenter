import { pool } from '../database'
const helpers = require('../libs/helpers');

////////////////// CREATE EGRESADO - LISTO F B
export const createEgresado = async(req, res)=>{
    try {
        const{ nombre, apellido, correo, genero, dnipasaporte, celular, ciudad, idrol, codigo_egresado, password, horario, universidad, grado} = req.body;
        const password2 = await helpers.encryptPassword(password);
        await pool.query('INSERT INTO persona(nombre, apellido, correo, genero, dnipasaporte, celular, ciudad, idrol) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8);', [nombre, apellido, correo, genero, dnipasaporte, celular, ciudad, idrol]);
        const response = await pool.query("select idpersona from persona where dnipasaporte = $1", [dnipasaporte]);
        const ideg = response.rows[0].idpersona;
        await pool.query('INSERT INTO egresado(idegresado, codigo_egresado, password, horario, universidad, grado, estado)	VALUES ($1, $2, $3, $4, $5, $6, $7);', [ideg, codigo_egresado, password2, horario, universidad, grado, '1']);
        return res.status(200).json(
            `Egresado ${ codigo_egresado } creado correctamente...!`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}
////////////////// CREATE ESTUDIANTE - LISTO F B
export const createEstudiante = async(req, res)=>{
    try {
        const{ nombre, apellido, correo, genero, dnipasaporte, celular, ciudad, idrol, codigo_estudiante, password, horario, ciclo, grupo, universidad} = req.body;
        const password2 = await helpers.encryptPassword(password);
        await pool.query('INSERT INTO persona(nombre, apellido, correo, genero, dnipasaporte, celular, ciudad, idrol) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8);', [nombre, apellido, correo, genero, dnipasaporte, celular, ciudad, idrol]);
        const response = await pool.query("select idpersona from persona where dnipasaporte = $1", [dnipasaporte]);
        const ides = response.rows[0].idpersona;
        await pool.query('INSERT INTO estudiante(idestudiante, codigo_estudiante, password, horario, ciclo, grupo, universidad, estado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);', [ides, codigo_estudiante, password2, horario, ciclo, grupo, universidad, '1']);
        return res.status(200).json(
            `Estudiante ${ codigo_estudiante } creado correctamente...!`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}

/////////////////////// LISTAR EGRESADO
export const readEgresado = async(req, res)=>{
    try {
        const response = await pool.query('select p.idpersona, p.nombre, p.apellido, p.correo, p.genero, p.dnipasaporte, p.celular, p.ciudad, p.idrol, e.codigo_egresado, e.password, e.horario, e.universidad, e.grado from persona p, egresado e, rol r where p.idpersona = e.idegresado and p.idrol = r.idrol');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}


/////////////////////// LISTAR EGRESADO POR ID
export const readEgresadoID = async(req, res)=>{
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('select p.idpersona, p.nombre, p.apellido, p.correo, p.genero, p.dnipasaporte, p.celular, p.ciudad, p.idrol, e.codigo_egresado, e.password, e.horario, e.universidad, e.grado from persona p, egresado e, rol r where p.idpersona = e.idegresado and p.idrol = r.idrol and p.idpersona=$1',[id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}

/////////////////////// MODIFICAR PERSONA - EGRESADO
export const updatePersonaEG = async(req, res)=>{
    try {
        const id = parseInt(req.params.id);
        const { nombre, apellido, correo, genero, dnipasaporte, celular, ciudad } = req.body; 
        const response = await pool.query('UPDATE persona set nombre = $1, apellido = $2, correo = $3, genero = $4, dnipasaporte = $5, celular = $6, ciudad = $7 where idpersona = $8',
        [nombre, apellido, correo, genero, dnipasaporte, celular, ciudad, id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}

/////////////////////// MODIFICAR EGRESADO
export const updateEgresado = async(req, res)=>{
    try {
        const id = parseInt(req.params.id);
        const { codigo_egresado, horario, universidad, grado } = req.body; 
        const response = await pool.query('UPDATE egresado set codigo_egresado = $1, horario = $2, universidad = $3, grado = $4 where idegresado = $5',
        [codigo_egresado, horario, universidad, grado, id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}

/////////////////////// ELIMINAR EGRESADO
export const deleteEgresado = async(req, res)=>{
    try {
        const id = parseInt(req.params.id);
        await pool.query('delete from egresado where idegresado=$1', [id]);
        await pool.query('delete from persona where idpersona=$1', [id]);
        return res.status(200).json(
            `Persona ${ id } eliminado correctamente...!`);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////
            /////////////////////////// ESTUDIANTES /////////////////////////             
/////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////// LISTAR ESTUDIANTE
export const readEstudiante = async(req, res)=>{
    try {
        const response = await pool.query('select p.idpersona, p.nombre, p.apellido, p.correo, p.genero, p.dnipasaporte, p.celular, p.ciudad, p.idrol, e.codigo_estudiante, e.password, e.horario, e.ciclo, e.grupo, e.universidad from persona p, estudiante e, rol r where p.idpersona = e.idestudiante and p.idrol = r.idrol');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}


/////////////////////// LISTAR ESTUDIANTE POR ID
export const readEstudianteID = async(req, res)=>{
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('select p.idpersona, p.nombre, p.apellido, p.correo, p.genero, p.dnipasaporte, p.celular, p.ciudad, p.idrol, e.codigo_estudiante, e.password, e.horario, e.ciclo, e.grupo, e.universidad from persona p, estudiante e, rol r where p.idpersona = e.idestudiante and p.idrol = r.idrol and p.idpersona=$1',[id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}

/////////////////////// MODIFICAR PERSONA - ESTUDIANTE
export const updatePersonaES = async(req, res)=>{
    try {
        const id = parseInt(req.params.id);
        const { nombre, apellido, correo, genero, dnipasaporte, celular, ciudad } = req.body; 
        const response = await pool.query('UPDATE persona set nombre = $1, apellido = $2, correo = $3, genero = $4, dnipasaporte = $5, celular = $6, ciudad = $7 where idpersona = $8',
        [nombre, apellido, correo, genero, dnipasaporte, celular, ciudad, id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}

/////////////////////// MODIFICAR ESTUDIANTE
export const updateEstudiante = async(req, res)=>{
    try {
        const id = parseInt(req.params.id);
        const { codigo_estudiante, horario, ciclo, grupo, universidad } = req.body; 
        const response = await pool.query('UPDATE estudiante set codigo_estudiante = $1, horario = $2, ciclo = $3, grupo = $4, universidad = $5 where idestudiante = $6',
        [codigo_estudiante, horario, ciclo, grupo, universidad, id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}

/////////////////////// ELIMINAR EGRESADO
export const deleteEstudiante = async(req, res)=>{
    try {
        const id = parseInt(req.params.id);
        await pool.query('delete from estudiante where idestudiante=$1', [id]);
        await pool.query('delete from persona where idpersona=$1', [id]);
        return res.status(200).json(
            `Persona ${ id } eliminado correctamente...!`);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}


/////////////// OPCIONES
export const opciones = async(req, res)=>{
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('select nombre1, nombre2, i, routerlink from opcion where idrol = $1;',
        [id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}


