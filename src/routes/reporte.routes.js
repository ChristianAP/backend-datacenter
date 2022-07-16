import { Router } from 'express'
const router = Router();
import * as reportCtrl from '../controllers/reporte.controller'

router.get('/', reportCtrl.reportePsicologo);

router.get('/reportFinal/:id', reportCtrl.reporteFinal);

router.get('/completado/', reportCtrl.finalizados);

router.get('/trunco/', reportCtrl.trunco);

router.get('/espera/', reportCtrl.espera);

router.get('/progreso/', reportCtrl.progreso);

router.get('/egresados/', reportCtrl.cantidadEgresados);

router.get('/estudiantes/', reportCtrl.cantidadEstudiantes);

export default router;