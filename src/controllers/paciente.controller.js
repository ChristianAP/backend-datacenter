import { pool } from '../database'
export const obtenerPaciente = async(req, res)=>{
    try {
        const { idrol, idpersona } = req.body;
        if (idrol == 2) {
            const obtPacienteEg = await pool.query('select idpaciente from paciente_solicitud where idegresado = $1 and estado = $2;', [idpersona, '2']);
            if (obtPacienteEg.rows.length > 0) {
                const idpac = obtPacienteEg.rows[0].idpaciente;
                const paciente = await pool.query('select p.idpersona, p.nombre, p.apellido, p.correo, p.genero, p.dnipasaporte, p.celular, p.ciudad, p.idrol, r.nombre_rol, pa.codigo_paciente, pa.edad, pa.direccion, a.nombre as nombre_area, s.descripcion, s.horario, ps.sesion1, ps.sesion2, ps.sesion3, ps.estado from persona p, paciente pa, rol r, paciente_solicitud ps, solicitud s, area a where p.idpersona = pa.idpaciente and r.idrol = p.idrol and pa.idpaciente = ps.idpaciente and ps.idsolicitud = s.idsolicitud and s.idarea = a.idarea and p.idpersona = $1;',[idpac]);
                return res.status(200).json(paciente.rows);
            }else{
                return res.status(200).json( `NO SE ENCONTRARON REGISTROS`);
            }
        }else if(idrol == 3){
            const obtPacienteEst = await pool.query('select idpaciente from paciente_solicitud where idestudiante = $1;', [idpersona]);
            if (obtPacienteEst.rows.length > 0) {
                const idpaci = obtPacienteEst.rows[0].idpaciente;
                const estudiante = await pool.query('select p.idpersona, p.nombre, p.apellido, p.correo, p.genero, p.dnipasaporte, p.celular, p.ciudad, p.idrol, r.nombre_rol, pa.codigo_paciente, pa.edad, pa.direccion, a.nombre as nombre_area, s.descripcion, s.horario, ps.sesion1, ps.sesion2, ps.sesion3, ps.estado from persona p, paciente pa, rol r, paciente_solicitud ps, solicitud s, area a where p.idpersona = pa.idpaciente and r.idrol = p.idrol and pa.idpaciente = ps.idpaciente and ps.idsolicitud = s.idsolicitud and s.idarea = a.idarea and p.idpersona = $1;',[idpaci]);
                return res.status(200).json(estudiante.rows);
            }else{
                return res.status(200).json( `NO SE ENCONTRARON REGISTROS`);
            }
        }  
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}

export const listarSesion1 = async (req, res)=>{
    try {
        const id  = parseInt(req.params.id);
        const obtSesiones = await pool.query('select sesion1, sesion2, sesion3 from paciente_solicitud where idpaciente = $1;', [id]);
        const sesion1 = obtSesiones.rows[0].sesion1;
        console.log(sesion1);
        const listS1 = await pool.query('select fecha, hora, url from reporte r where idreporte = $1', [sesion1]);
        console.log(listS1.rows);
        if (listS1.rows[0].fecha != null) {
        return res.status(200).json([
            listS1.rows[0]]);
        }else{
            return res.status(200).json(`NO SE ENCONTRARON REGISTROS`);
        }
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');        
    }
}
export const listarSesion2 = async (req, res)=>{
    try {
        const id  = parseInt(req.params.id);
        const obtSesiones = await pool.query('select sesion1, sesion2, sesion3 from paciente_solicitud where idpaciente = $1;', [id]);
        const sesion2 = obtSesiones.rows[0].sesion2;
        console.log( sesion2);
        const listS2 = await pool.query('select fecha, hora, url from reporte r where idreporte = $1', [sesion2]);
        console.log(listS2.rows);
        if (listS2.rows[0].fecha != null) {
        return res.status(200).json([
            listS2.rows[0]]);
        }else{
            return res.status(200).json(`NO SE ENCONTRARON REGISTROS`);
        }
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');        
    }
}
export const listarSesion3 = async (req, res)=>{
    try {
        const id  = parseInt(req.params.id);
        const obtSesiones = await pool.query('select sesion1, sesion2, sesion3 from paciente_solicitud where idpaciente = $1;', [id]);
        const sesion3 = obtSesiones.rows[0].sesion3;
        console.log(sesion3);
        const listS3 = await pool.query('select fecha, hora, url from reporte r where idreporte = $1', [sesion3]);
        console.log(listS3.rows);
        if (listS3.rows[0].fecha != null) {
        return res.status(200).json([
             listS3.rows[0]]);
        }else{
            return res.status(200).json(`NO SE ENCONTRARON REGISTROS`);
        }
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');        
    }


}
export const getSesionID = async (req, res)=>{
    try {
        const id = parseInt(req.params.id);
        const data = await pool.query('select idreporte, fecha, hora, url from reporte r where idreporte = $1', [id]);
        return res.status(200).json(data.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');           
    }
} 
export const getReporteID = async (req, res)=>{
    try {
        const id = parseInt(req.params.id);
        const data = await pool.query('select idreporte, obs_generales, antecedentes, problem_actual, acciones_realiz, conclusiones, recomendaciones from reporte r where idreporte = $1', [id]);
        return res.status(200).json(data.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');           
    }
} 
export const createSesion = async (req, res)=>{
    try {
        const id = parseInt(req.params.id);
        const { fecha, hora, url } = req.body;
        await pool.query('UPDATE reporte set fecha = $1, hora = $2, url = $3 where idreporte = $4;', [fecha, hora, url, id]);
        return res.status(200).json(`REGISTRO MODIFICADO CORRECTAMENTE`);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');           
    }
} 

////////////////// GENERAR REPORTE
export const generarReporte = async (req, res)=>{
    try {
        const id  = parseInt(req.params.id);
        const { obs_generales, antecedentes, problem_actual, acciones_realiz, conclusiones, recomendaciones } = req.body;
        await pool.query('UPDATE reporte set obs_generales = $1, antecedentes= $2, problem_actual= $3, acciones_realiz= $4, conclusiones= $5, recomendaciones= $6 where idreporte = $7;',
        [obs_generales, antecedentes, problem_actual, acciones_realiz, conclusiones, recomendaciones, id]);
        return res.status(200).json(`REPORTE GENERADO CORRECTAMENTE`)
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}

//////////// VALIDAR REPORTES FINAL

export const validarRFinal = async (req, res) => {
    try {
        const id  = parseInt(req.params.id);
       
        const obtSesion = await pool.query('select sesion1, sesion2, sesion3 from paciente_solicitud where idpaciente = $1 and estado = $2', [id, '2']);
        const s1 = obtSesion.rows[0].sesion1;
        const s2 = obtSesion.rows[0].sesion2;
        const s3 = obtSesion.rows[0].sesion3;

                /////////////// VALIDANDO REPORTE 1
        const r1 = await pool.query('select obs_generales, antecedentes, problem_actual, acciones_realiz, conclusiones, recomendaciones from reporte where idreporte = $1', [s1]);
        const observacion1 = r1.rows[0].obs_generales;
        const antecedentes1 = r1.rows[0].antecedentes;
        const problema1 = r1.rows[0].problem_actual;
        const acciones1 = r1.rows[0].acciones_realiz;
        const conclusiones1 = r1.rows[0].conclusiones;
        const recomendaciones1 = r1.rows[0].recomendaciones;

       
        /////////////// VALIDANDO REPORTE 2
        const r2 = await pool.query('select obs_generales, antecedentes, problem_actual, acciones_realiz, conclusiones, recomendaciones from reporte where idreporte = $1', [s2]);
        const observacion2 = r2.rows[0].obs_generales;
        const antecedentes2 = r2.rows[0].antecedentes;
        const problema2 = r2.rows[0].problem_actual;
        const acciones2 = r2.rows[0].acciones_realiz;
        const conclusiones2 = r2.rows[0].conclusiones;
        const recomendaciones2 = r2.rows[0].recomendaciones;

        

        /////////////// VALIDANDO REPORTE 3
        const r3 = await pool.query('select obs_generales, antecedentes, problem_actual, acciones_realiz, conclusiones, recomendaciones from reporte where idreporte = $1', [s3]);
        const observacion3 = r3.rows[0].obs_generales;
        const antecedentes3 = r3.rows[0].antecedentes;
        const problema3 = r3.rows[0].problem_actual;
        const acciones3 = r3.rows[0].acciones_realiz;
        const conclusiones3 = r3.rows[0].conclusiones;
        const recomendaciones3 = r3.rows[0].recomendaciones;

       

        ///////////////////// FIN VALIDACION
        console.log("r1 = " + observacion3 + "r2 = " +antecedentes2 + "r3 = " + problema1)
        if(observacion3 != null && antecedentes2 != null && problema1 != null){
            return res.status(200).json("LOS REPORTES DE LAS SESIONES ESTAN COMPLETAS");
        }else{
            return res.status(200).json("AUN FALTA COMPLETAR LOS REPORTES DE LAS SESIONES");
        }
    
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}

export const casoFinalizado = async (req, res)=>{
    try {
        const { idpersona, idpsicologo } = req.body;
        console.log("entro" + idpsicologo);
        const psico = await pool.query('select idrol from persona  where idpersona  = $1;' , [idpsicologo]);
        if (psico.rows[0].idrol = 2) {
            await pool.query('UPDATE egresado set estado = $1 where idegresado = $2;', ['0', idpsicologo]);
            await pool.query('UPDATE paciente_solicitud set estado = $1 where idpaciente = $2;' ,['1', idpersona]);
            console.log("EGRESADO y Solicitud modificada!");
        }else if(psico.rows[0].idrol = 3){
            await pool.query('UPDATE estudiante set estado = $1 where idestudiante = $2;', ['0', idpsicologo]);
            await pool.query('UPDATE paciente_solicitud set estado = $1 where idpaciente = $2;' ,['1', idpersona]);
            console.log("ESTUDIANTE y Solicitud modificada!");
        }
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');        
    }
}

export const casoTrunco = async (req, res)=>{
    try {
        const { idpersona, idpsicologo } = req.body;
        console.log("entro" + idpsicologo);
        const psico = await pool.query('select idrol from persona  where idpersona  = $1;' , [idpsicologo]);
        if (psico.rows[0].idrol = 2) {
            await pool.query('UPDATE egresado set estado = $1 where idegresado = $2;', ['0', idpsicologo]);
            await pool.query('UPDATE paciente_solicitud set estado = $1 where idpaciente = $2;' ,['3', idpersona]);
            console.log("EGRESADO y Solicitud modificada!");
        }else if(psico.rows[0].idrol = 3){
            await pool.query('UPDATE estudiante set estado = $1 where idestudiante = $2;', ['0', idpsicologo]);
            await pool.query('UPDATE paciente_solicitud set estado = $1 where idpaciente = $2;' ,['3', idpersona]);
            console.log("ESTUDIANTE y Solicitud modificada!");
        }
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');        
    }
}
