import { Router } from 'express'
const router = Router();
import * as pacienteCtrl from '../controllers/paciente.controller'

router.post('/', pacienteCtrl.obtenerPaciente);

router.get('/sesion1/:id', pacienteCtrl.listarSesion1);

router.get('/sesion2/:id', pacienteCtrl.listarSesion2);

router.get('/sesion3/:id', pacienteCtrl.listarSesion3);

router.put('/createSesion/:id', pacienteCtrl.createSesion);

router.get('/sesionID/:id', pacienteCtrl.getSesionID);

router.put('/createReporte/:id', pacienteCtrl.generarReporte);

router.get('/reporteID/:id', pacienteCtrl.getReporteID);

router.get('/validar/:id', pacienteCtrl.validarRFinal);

router.post('/complete/', pacienteCtrl.casoFinalizado);

router.post('/trunco/', pacienteCtrl.casoTrunco);

export default router;