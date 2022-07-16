import { pool } from '../database'

////////////////////////// REPORTE PSICOLOGO PERSONAL

export const reportePsicologo = async (req, res)=>{
    try {
            const paciente = await pool.query('select p.idpersona, p.nombre, p.apellido, p.correo, p.celular, p.dnipasaporte, pa.codigo_paciente, pa.edad, ps.estado, r1.fecha as fecha1, r1.hora as hora1, r1.url as url1, r1.obs_generales as obs_generales1, r1.antecedentes as antecedentes1, r1.problem_actual as problem_actual1, r1.acciones_realiz as acciones_realiz1, r1.conclusiones as conclusiones1, r1.recomendaciones as recomendaciones1, r2.fecha as fecha2, r2.hora as hora2, r2.url as url2, r2.obs_generales as obs_generales2, r2.antecedentes as antecedentes2, r2.problem_actual as problem_actual2, r2.acciones_realiz as acciones_realiz2, r2.conclusiones as conclusiones2, r2.recomendaciones as recomendaciones2, r3.fecha as fecha3, r3.hora as hora3, r3.url as url3, r3.obs_generales as obs_generales3, r3.antecedentes as antecedentes3, r3.problem_actual as problem_actual3, r3.acciones_realiz as acciones_realiz3, r3.conclusiones as conclusiones3, r3.recomendaciones as recomendaciones3 from reporte r1, reporte r2, reporte r3, paciente_solicitud ps, persona p, paciente pa where r1.idreporte = ps.sesion1 and r2.idreporte = ps.sesion2 and r3.idreporte = ps.sesion3 and p.idpersona = pa.idpaciente and pa.idpaciente= ps.idpaciente');
            return res.status(200).json(paciente.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');                
    }
}

export const reporteFinal = async (req, res)=>{
    try {
            const id = parseInt(req.params.id);
            const paciente = await pool.query('select p.idpersona, p.nombre, p.apellido, p.correo, p.celular, p.dnipasaporte, pa.codigo_paciente, pa.edad, ps.estado, r1.fecha as fecha1, r1.hora as hora1, r1.url as url1, r1.obs_generales as obs_generales1, r1.antecedentes as antecedentes1, r1.problem_actual as problem_actual1, r1.acciones_realiz as acciones_realiz1, r1.conclusiones as conclusiones1, r1.recomendaciones as recomendaciones1, r2.fecha as fecha2, r2.hora as hora2, r2.url as url2, r2.obs_generales as obs_generales2, r2.antecedentes as antecedentes2, r2.problem_actual as problem_actual2, r2.acciones_realiz as acciones_realiz2, r2.conclusiones as conclusiones2, r2.recomendaciones as recomendaciones2, r3.fecha as fecha3, r3.hora as hora3, r3.url as url3, r3.obs_generales as obs_generales3, r3.antecedentes as antecedentes3, r3.problem_actual as problem_actual3, r3.acciones_realiz as acciones_realiz3, r3.conclusiones as conclusiones3, r3.recomendaciones as recomendaciones3 from reporte r1, reporte r2, reporte r3, paciente_solicitud ps, persona p, paciente pa where r1.idreporte = ps.sesion1 and r2.idreporte = ps.sesion2 and r3.idreporte = ps.sesion3 and p.idpersona = pa.idpaciente and pa.idpaciente= ps.idpaciente and p.idpersona = $1;', [id]);
            return res.status(200).json(paciente.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');                
    }
}

export const finalizados = async (req, res)=>{
    try {
            const paciente = await pool.query('select p.idpersona, p.nombre, p.apellido, p.correo, p.celular, ps.estado, a.nombre as problema, n.nombre  as nivel from persona p, paciente pa, paciente_solicitud ps, solicitud s, area a, nivel n where p.idpersona = pa.idpaciente and ps.idpaciente = pa.idpaciente and s.idsolicitud = ps.idsolicitud and s.idarea = a.idarea and a.idnivel = n.idnivel and ps.estado = $1;', ['1']);
            return res.status(200).json(paciente.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');                
    }
}

export const espera = async (req, res)=>{
    try {
            const paciente = await pool.query('select p.idpersona, p.nombre, p.apellido, p.correo, p.celular, ps.estado, a.nombre as problema, n.nombre  as nivel  from persona p, paciente pa, paciente_solicitud ps, solicitud s, area a, nivel n where p.idpersona = pa.idpaciente and ps.idpaciente = pa.idpaciente and s.idsolicitud = ps.idsolicitud and s.idarea = a.idarea and a.idnivel = n.idnivel and ps.estado = $1;', ['0']);
            return res.status(200).json(paciente.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');                
    }
}

export const trunco = async (req, res)=>{
    try {
            const paciente = await pool.query('select p.idpersona, p.nombre, p.apellido, p.correo, p.celular, ps.estado, a.nombre as problema, n.nombre as nivel  from persona p, paciente pa, paciente_solicitud ps, solicitud s, area a, nivel n where p.idpersona = pa.idpaciente and ps.idpaciente = pa.idpaciente and s.idsolicitud = ps.idsolicitud and s.idarea = a.idarea and a.idnivel = n.idnivel and ps.estado = $1;', ['4']);
            return res.status(200).json(paciente.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');                
    }
}

export const progreso = async (req, res)=>{
    try {
            const paciente = await pool.query('select p.idpersona, p.nombre, p.apellido, p.correo, p.celular, ps.estado, a.nombre as problema, n.nombre as nivel  from persona p, paciente pa, paciente_solicitud ps, solicitud s, area a, nivel n where p.idpersona = pa.idpaciente and ps.idpaciente = pa.idpaciente and s.idsolicitud = ps.idsolicitud and s.idarea = a.idarea and a.idnivel = n.idnivel and ps.estado = $1;', ['2']);
            return res.status(200).json(paciente.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');                
    }
}

export const cantidadEgresados = async (req, res)=>{
    try {
            const paciente = await pool.query('select * from egresado where estado = $1', ['0']);
            return res.status(200).json(paciente.rows.length);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');                
    }
}
export const cantidadEstudiantes = async (req, res)=>{
    try {
            const paciente = await pool.query('select * from estudiante where estado = $1', ['0']);
            return res.status(200).json(paciente.rows.length);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');                
    }
}