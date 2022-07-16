import { pool } from '../database'
const helpers = require('../libs/helpers');
import { transporter } from '../auth/mailer'


export const SolicitudPaciente = async(req, res)=>{
    try {
        const{ nombre, apellido, correo, genero, dnipasaporte, celular, ciudad, edad, direccion, idarea, descripcion, horario, preferencia, estado} = req.body;
        
        await pool.query('INSERT INTO persona(nombre, apellido, correo, genero, dnipasaporte, celular, ciudad, idrol) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);', 
        [nombre, apellido, correo, genero, dnipasaporte, celular, ciudad, "4"]);

                const response = await pool.query("select idpersona from persona where dnipasaporte = $1", [dnipasaporte]);
                const idpa = response.rows[0].idpersona;

        await pool.query('INSERT INTO paciente(idpaciente, edad, direccion) VALUES ($1, $2, $3);', 
        [idpa, edad, direccion]);

        await pool.query('INSERT INTO solicitud(idarea, descripcion, horario, preferencia) VALUES ($1, $2, $3, $4);', 
        [idarea, descripcion, horario, preferencia]);

            const response2 = await pool.query("select max(idsolicitud) as id from solicitud;");
            const idsol = response2.rows[0].id;

        await pool.query('INSERT INTO paciente_solicitud(idpaciente, estado, idsolicitud) VALUES ($1, $2, $3);', 
        [idpa, '0', idsol]);

        ////////////////////////////////////// DERIVACIÓN ///////////////////////////////
        ///////////////////// necesitas el id solicitud para realizar la derivación ///////////
        const maximo = await pool.query('select max(idsolicitud) as id from solicitud;');
        console.log('paso 1');
        const idMxSol = maximo.rows[0].id;
        console.log(idMxSol);
        const gravedad = await pool.query('select s.idarea, a.idnivel as gravedad, s.horario from solicitud s, area a where s.idarea = a.idarea and s.idsolicitud = $1;', 
        [idMxSol]);
        console.log('paso 2');
        const horario_soli = gravedad.rows[0].horario;
        if(gravedad.rows[0].gravedad == 2){
            const listEgresado = await pool.query('select idegresado, horario from egresado where horario = $1 and estado = $2;', [horario_soli, '0']);
            console.log(listEgresado.rows.length, listEgresado.rows);
                if(listEgresado.rows.length != 0){
                    console.log("averga");
                    const selectEgresado = listEgresado.rows[Math.floor(Math.random() * listEgresado.rows.length)];
                    console.log(selectEgresado.idegresado);
                    await pool.query('update paciente_solicitud set idegresado = $1, estado = $2 where idsolicitud = $3 ', [selectEgresado.idegresado, '2', idMxSol]);
                    await pool.query('update egresado set estado = $1 where idegresado = $2', ['1', selectEgresado.idegresado]);

                    /////////////////////////////////////////////////// DEFINIR SESIONES

                        await pool.query('INSERT INTO reporte(fecha, hora, url, obs_generales, antecedentes, problem_actual, acciones_realiz, conclusiones, recomendaciones) values($1, $2, $3, $4, $5, $6, $7, $8, $9);',
                        [null, null, null, null, null, null, null, null, null]);
                        const sesion1 = await pool.query('select max(idreporte) as id from reporte;');
                        const idsesion1 = sesion1.rows[0].id;
                        console.log(idsesion1);
                        
                        await pool.query('INSERT INTO reporte(fecha, hora, url, obs_generales, antecedentes, problem_actual, acciones_realiz, conclusiones, recomendaciones) values($1, $2, $3, $4, $5, $6, $7, $8, $9);',
                        [null, null, null, null, null, null, null, null, null]);
                        const sesion2 = await pool.query('select max(idreporte) as id2 from reporte;');
                        const idsesion2 = sesion2.rows[0].id2;
                        console.log(idsesion2);

                        await pool.query('INSERT INTO reporte(fecha, hora, url, obs_generales, antecedentes, problem_actual, acciones_realiz, conclusiones, recomendaciones) values($1, $2, $3, $4, $5, $6, $7, $8, $9);',
                        [null, null, null, null, null, null, null, null, null]);
                        const sesion3 = await pool.query('select max(idreporte) as id3 from reporte;');
                        const idsesion3 = sesion3.rows[0].id3;
                        console.log(idsesion3);

                    await pool.query('UPDATE paciente_solicitud set sesion1 = $1, sesion2 = $2, sesion3 = $3 where idsolicitud = $4;', 
                    [idsesion1, idsesion2, idsesion3, idMxSol]);

                    const c = await pool.query('select max(codigo_paciente) as codigo from paciente;');
                    const code = c.rows[0].codigo;                    
                    return res.status(200).json(['Su solicitud se ah generado con exito, y se le ah asignado un psicólogo que atenderá su caso, sirvase guardar el siguiente código que le permitirá loguearse junto con su DNI en el login de paciente, donde podrá visualizar las sesiones que le programará su psicologo.' , code]);
                }else if(listEgresado.rows.length == 1){

                    await pool.query('update paciente_solicitud set idegresado = $1, estado = $2 where idsolicitud = $3 ', [listEgresado.rows[0].idegresado, '2', idMxSol]);
                    await pool.query('update egresado set estado = $1 where idegresado = $2', ['1', listEgresado.rows[0].idegresado]);

                    /////////////////////////////////////////////////// DEFINIR SESIONES

                        await pool.query('INSERT INTO reporte(fecha, hora, url, obs_generales, antecedentes, problem_actual, acciones_realiz, conclusiones, recomendaciones) values($1, $2, $3, $4, $5, $6, $7, $8, $9);',
                        [null, null, null, null, null, null, null, null, null]);
                        const sesion1 = await pool.query('select max(idreporte) as id from reporte;');
                        const idsesion1 = sesion1.rows[0].id;
                        console.log(idsesion1);
                        
                        await pool.query('INSERT INTO reporte(fecha, hora, url, obs_generales, antecedentes, problem_actual, acciones_realiz, conclusiones, recomendaciones) values($1, $2, $3, $4, $5, $6, $7, $8, $9);',
                        [null, null, null, null, null, null, null, null, null]);
                        const sesion2 = await pool.query('select max(idreporte) as id2 from reporte;');
                        const idsesion2 = sesion2.rows[0].id2;
                        console.log(idsesion2);

                        await pool.query('INSERT INTO reporte(fecha, hora, url, obs_generales, antecedentes, problem_actual, acciones_realiz, conclusiones, recomendaciones) values($1, $2, $3, $4, $5, $6, $7, $8, $9);',
                        [null, null, null, null, null, null, null, null, null]);
                        const sesion3 = await pool.query('select max(idreporte) as id3 from reporte;');
                        const idsesion3 = sesion3.rows[0].id3;
                        console.log(idsesion3);

                    await pool.query('UPDATE paciente_solicitud set sesion1 = $1, sesion2 = $2, sesion3 = $3 where idsolicitud = $4;', 
                    [idsesion1, idsesion2, idsesion3, idMxSol]);
                    console.log('SESIONES GENERADAS CORRECTAMENTE ...');
                    const c = await pool.query('select max(codigo_paciente) as codigo from paciente;');
                    const code = c.rows[0].codigo;                    
                    return res.status(200).json(['Su solicitud se ah generado con exito, y se le ah asignado un psicólogo que atenderá su caso, sirvase guardar el siguiente código que le permitirá loguearse junto con su DNI en el login de paciente, donde podrá visualizar las sesiones que le programará su psicologo.', code]);
                }else if(listEgresado.rows.length == 0){
                    await pool.query('UPDATE paciente_solicitud set estado = $1, idegresado = $2 where idsolicitud = $3;',['0', null, idMxSol]);
                    /////////////////////////////////////////////////// DEFINIR SESIONES

                    await pool.query('INSERT INTO reporte(fecha, hora, url, obs_generales, antecedentes, problem_actual, acciones_realiz, conclusiones, recomendaciones) values($1, $2, $3, $4, $5, $6, $7, $8, $9);',
                    [null, null, null, null, null, null, null, null, null]);
                    const sesion1 = await pool.query('select max(idreporte) as id from reporte;');
                    const idsesion1 = sesion1.rows[0].id;
                    console.log(idsesion1);
                    
                    await pool.query('INSERT INTO reporte(fecha, hora, url, obs_generales, antecedentes, problem_actual, acciones_realiz, conclusiones, recomendaciones) values($1, $2, $3, $4, $5, $6, $7, $8, $9);',
                    [null, null, null, null, null, null, null, null, null]);
                    const sesion2 = await pool.query('select max(idreporte) as id2 from reporte;');
                    const idsesion2 = sesion2.rows[0].id2;
                    console.log(idsesion2);

                    await pool.query('INSERT INTO reporte(fecha, hora, url, obs_generales, antecedentes, problem_actual, acciones_realiz, conclusiones, recomendaciones) values($1, $2, $3, $4, $5, $6, $7, $8, $9);',
                    [null, null, null, null, null, null, null, null, null]);
                    const sesion3 = await pool.query('select max(idreporte) as id3 from reporte;');
                    const idsesion3 = sesion3.rows[0].id3;
                    console.log(idsesion3);

                await pool.query('UPDATE paciente_solicitud set sesion1 = $1, sesion2 = $2, sesion3 = $3 where idsolicitud = $4;', 
                [idsesion1, idsesion2, idsesion3, idMxSol]);
                console.log('SESIONES GENERADAS CORRECTAMENTE ...');
                    const c = await pool.query('select max(codigo_paciente) as codigo from paciente;');
                    const code = c.rows[0].codigo;
                    
                    return res.status(200).json(['Los psicologos estan atendiendo otros casos, una vez que se desocupe un psicologo se le asignará su caso y se le comunicará a su correo electrónico especificado en la solicitud, agradecemos su comprensión.\n Sirvase guardar el siguiente código para poder loguearse y ver las sesiones que se le programe. ',code]);
                }
            
        }else{
            const listEstudiante = await pool.query('select idestudiante, horario from estudiante where horario = $1 and estado = $2;', [horario_soli, '0']);
            console.log(listEstudiante.rows.length, listEstudiante.rows);
                if(listEstudiante.rows.length != 0){
                    console.log("averga");
                    const selectEstudiante = listEstudiante.rows[Math.floor(Math.random() * listEstudiante.rows.length)];
                    console.log(selectEstudiante.idestudiante);
                    await pool.query('update paciente_solicitud set idestudiante = $1, estado = $2 where idsolicitud = $3 ', [selectEstudiante.idestudiante, '2', idMxSol]);
                    await pool.query('update estudiante set estado = $1 where idestudiante = $2', ['1', selectEstudiante.idestudiante]);

                    
                    /////////////////////////////////////////////////// DEFINIR SESIONES

                    await pool.query('INSERT INTO reporte(fecha, hora, url, obs_generales, antecedentes, problem_actual, acciones_realiz, conclusiones, recomendaciones) values($1, $2, $3, $4, $5, $6, $7, $8, $9);',
                    [null, null, null, null, null, null, null, null, null]);
                    const sesion1 = await pool.query('select max(idreporte) as id from reporte;');
                    const idsesion1 = sesion1.rows[0].id;
                    console.log(idsesion1);
                    
                    await pool.query('INSERT INTO reporte(fecha, hora, url, obs_generales, antecedentes, problem_actual, acciones_realiz, conclusiones, recomendaciones) values($1, $2, $3, $4, $5, $6, $7, $8, $9);',
                    [null, null, null, null, null, null, null, null, null]);
                    const sesion2 = await pool.query('select max(idreporte) as id2 from reporte;');
                    const idsesion2 = sesion2.rows[0].id2;
                    console.log(idsesion2);

                    await pool.query('INSERT INTO reporte(fecha, hora, url, obs_generales, antecedentes, problem_actual, acciones_realiz, conclusiones, recomendaciones) values($1, $2, $3, $4, $5, $6, $7, $8, $9);',
                    [null, null, null, null, null, null, null, null, null]);
                    const sesion3 = await pool.query('select max(idreporte) as id3 from reporte;');
                    const idsesion3 = sesion3.rows[0].id3;
                    console.log(idsesion3);

                await pool.query('UPDATE paciente_solicitud set sesion1 = $1, sesion2 = $2, sesion3 = $3 where idsolicitud = $4;', 
                [idsesion1, idsesion2, idsesion3, idMxSol]);

                const c = await pool.query('select max(codigo_paciente) as codigo from paciente;');
                const code = c.rows[0].codigo;
            
                return res.status(200).json(['Su solicitud se ah generado con exito, y se le ah asignado un psicólogo que atenderá su caso, sirvase guardar el siguiente código que le permitirá loguearse junto con su DNI en el login de paciente, donde podrá visualizar las sesiones que le programará su psicologo.', code]);
            

                }else if(listEstudiante.rows.length == 1){
                    await pool.query('update paciente_solicitud set idestudiante = $1, estado = $2 where idsolicitud = $3 ', [listEstudiante.rows[0].idestudiante, '2', idMxSol]);
                    await pool.query('update estudiante set estado = $1 where idestudiante = $2', ['1', listEstudiante.rows[0].idestudiante]);
                    
                    /////////////////////////////////////////////////// DEFINIR SESIONES

                    await pool.query('INSERT INTO reporte(fecha, hora, url, obs_generales, antecedentes, problem_actual, acciones_realiz, conclusiones, recomendaciones) values($1, $2, $3, $4, $5, $6, $7, $8, $9);',
                    [null, null, null, null, null, null, null, null, null]);
                    const sesion1 = await pool.query('select max(idreporte) as id from reporte;');
                    const idsesion1 = sesion1.rows[0].id;
                    console.log(idsesion1);
                    
                    await pool.query('INSERT INTO reporte(fecha, hora, url, obs_generales, antecedentes, problem_actual, acciones_realiz, conclusiones, recomendaciones) values($1, $2, $3, $4, $5, $6, $7, $8, $9);',
                    [null, null, null, null, null, null, null, null, null]);
                    const sesion2 = await pool.query('select max(idreporte) as id2 from reporte;');
                    const idsesion2 = sesion2.rows[0].id2;
                    console.log(idsesion2);

                    await pool.query('INSERT INTO reporte(fecha, hora, url, obs_generales, antecedentes, problem_actual, acciones_realiz, conclusiones, recomendaciones) values($1, $2, $3, $4, $5, $6, $7, $8, $9);',
                    [null, null, null, null, null, null, null, null, null]);
                    const sesion3 = await pool.query('select max(idreporte) as id3 from reporte;');
                    const idsesion3 = sesion3.rows[0].id3;
                    console.log(idsesion3);

                await pool.query('UPDATE paciente_solicitud set sesion1 = $1, sesion2 = $2, sesion3 = $3 where idsolicitud = $4;', 
                [idsesion1, idsesion2, idsesion3, idMxSol]);
                 const c = await pool.query('select max(codigo_paciente) as codigo from paciente;');
                    const code = c.rows[0].codigo;
                    
                    return res.status(200).json(['Su solicitud se ah generado con exito, y se le ah asignado un psicólogo que atenderá su caso, sirvase guardar el siguiente código que le permitirá loguearse junto con su DNI en el login de paciente, donde podrá visualizar las sesiones que le programará su psicologo.', code]);
                
                }else if(listEstudiante.rows.length == 0){
                    await pool.query('UPDATE paciente_solicitud set estado = $1, idestudiante = $2 where idsolicitud = $3;',['0', null, idMxSol]);
                    /////////////////////////////////////////////////// DEFINIR SESIONES

                    await pool.query('INSERT INTO reporte(fecha, hora, url, obs_generales, antecedentes, problem_actual, acciones_realiz, conclusiones, recomendaciones) values($1, $2, $3, $4, $5, $6, $7, $8, $9);',
                    [null, null, null, null, null, null, null, null, null]);
                    const sesion1 = await pool.query('select max(idreporte) as id from reporte;');
                    const idsesion1 = sesion1.rows[0].id;
                    console.log(idsesion1);
                    
                    await pool.query('INSERT INTO reporte(fecha, hora, url, obs_generales, antecedentes, problem_actual, acciones_realiz, conclusiones, recomendaciones) values($1, $2, $3, $4, $5, $6, $7, $8, $9);',
                    [null, null, null, null, null, null, null, null, null]);
                    const sesion2 = await pool.query('select max(idreporte) as id2 from reporte;');
                    const idsesion2 = sesion2.rows[0].id2;
                    console.log(idsesion2);

                    await pool.query('INSERT INTO reporte(fecha, hora, url, obs_generales, antecedentes, problem_actual, acciones_realiz, conclusiones, recomendaciones) values($1, $2, $3, $4, $5, $6, $7, $8, $9);',
                    [null, null, null, null, null, null, null, null, null]);
                    const sesion3 = await pool.query('select max(idreporte) as id3 from reporte;');
                    const idsesion3 = sesion3.rows[0].id3;
                    console.log(idsesion3);

                await pool.query('UPDATE paciente_solicitud set sesion1 = $1, sesion2 = $2, sesion3 = $3 where idsolicitud = $4;', 
                [idsesion1, idsesion2, idsesion3, idMxSol]);
                console.log('SESIONES GENERADAS CORRECTAMENTE ...');
                    const c = await pool.query('select max(codigo_paciente) as codigo from paciente;');
                    const code = c.rows[0].codigo;
                    
                    return res.status(200).json(['Los psicologos estan atendiendo otros casos, una vez que se desocupe un psicologo se le asignará su caso y se le comunicará a su correo electrónico especificado en la solicitud, agradecemos su comprensión.\n Sirvase guardar el siguiente código para poder loguearse y ver las sesiones que se le programe. ', code]);
                
                }
        }

    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}
////////////////// LISTAR SELECT de Áreas
export const listarAreas = async(req, res)=>{
    try {
        const response = await pool.query('select idarea ,nombre from area');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}

////////////////// DERIVACIÓN
export const Derivacion = async(req, res)=>{
    try {
        const response = await pool.query('select max(idsolicitud) as id from solicitud;');
        const idMxSol = response.rows[0].id;
        const response2 = await pool.query('select s.idarea, a.idnivel as gravedad, s.horario from solicitud s, area a where s.idarea = a.idarea and s.idsolicitud = $1;', 
        [idMxSol]);
        const horario_soli = response2.rows[0].horario;
        if(response2.rows[0].gravedad == 2){
            const egresado = await pool.query('select idegresado, horario from egresado;');
            const eg_horario = egresado.rows[0].horario;
            if(eg_horario == horario_soli){
                const listEgresado = await pool.query('select idegresado from egresado where horario = $1 and estado = $2', [horario_soli, '0']);
                if(listEgresado.rows > 1){
                    const selectEgresado = listEgresado.rows[Math.floor(Math.random() * listEgresado.rows.length)];
                    console.log(selectEgresado.rows[0].idegresado);
                    await pool.query('update paciente_solicitud set idegresado = $1 where idsolicitud = $2 ', [selectEgresado, idMxSol]);
                }
            }
        }else{
            const estudiante = await pool.query('select idestudiante, horario from estudiante;');

            const estu_horario = estudiante.rows[0].horario;
            if(estu_horario == horario_soli){
                const listEstudiante = await pool.query('select idestudiante from estudiante where horario = $1 and estado = $2', [horario_soli, '0']);
                if(listEstudiante.rows > 1){
                    const selectEstudiante = listEstudiante.rows[Math.floor(Math.random() * listEstudiante.rows.length)];
                    console.log(selectEstudiante.rows[0].idestudiante);
                    await pool.query('update paciente_solicitud set idestudiante = $1 where idsolicitud = $2 ', [selectEstudiante, idMxSol]);
                }
            }
        }
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}