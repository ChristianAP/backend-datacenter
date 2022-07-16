import { pool } from '../database'
export const readAllPrueba = async(req, res)=>{
    try {
        const response = await pool.query('select p.idpersona, p.nombre, p.apellido, p.correo, p.idrol, r.nombre_rol, e.codigo_egresado as "codigo", e.password from persona p, egresado e, rol r where p.idpersona = e.idegresado and p.idrol = r.idrol');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}