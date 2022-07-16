import { Router } from 'express'
const router = Router();
import * as solicitudCtrl from '../controllers/solicitud.controller'

router.post('/', solicitudCtrl.SolicitudPaciente);

router.get('/area', solicitudCtrl.listarAreas);

export default router;