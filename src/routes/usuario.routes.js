import { Router } from 'express'
const router = Router();
import * as UsuarioCtrl from '../controllers/usuario.controller'
import * as PruebaCtrl from '../controllers/prueba.controller'

    router.post('/createEgresado/', UsuarioCtrl.createEgresado); //// CREAR EGRESADO
    
    router.post('/createEstudiante/', UsuarioCtrl.createEstudiante); //// CREAR ESTUDIANTE

    router.get('/prueba/', PruebaCtrl.readAllPrueba); //// CREAR ESTUDIANTE

    router.get('/listEgresado/', UsuarioCtrl.readEgresado); //// LISTAR EGRESADO

    router.get('/listEgresadoID/:id', UsuarioCtrl.readEgresadoID); //// LISTAR EGRESADO por ID

    router.put('/updateEgresadoPer/:id', UsuarioCtrl.updatePersonaEG); //// MODIFICAR PERSONA - EGRESADO PER

    router.put('/updateEgresado/:id', UsuarioCtrl.updateEgresado); //// MODIFICAR EGRESADO

    router.delete('/deleteEgresado/:id', UsuarioCtrl.deleteEgresado); //// ELIMINAR EGRESADO

    router.get('/listEstudiante/', UsuarioCtrl.readEstudiante); //// LISTAR ESTUDIANTE

    router.get('/listEstudianteID/:id', UsuarioCtrl.readEstudianteID); //// LISTAR ESTUDIANTE ID

    router.put('/updateEstudiantePer/:id', UsuarioCtrl.updatePersonaES); //// MODIFICAR ESTUDIANTE - PERSONA EST

    router.put('/updateEstudiante/:id', UsuarioCtrl.updateEstudiante); //// MODIFICAR ESTUDIANTE

    router.delete('/deleteEstudiante/:id', UsuarioCtrl.deleteEstudiante); //// ELIMINAR ESTUDIANTE

    router.get('/opciones/:id', UsuarioCtrl.opciones); //// OPCIONES

export default router;