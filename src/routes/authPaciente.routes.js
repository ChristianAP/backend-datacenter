import { Router } from 'express'
const router = Router();
import * as authPacienteCtrl from '../controllers/authPaciente.controller'

router.post('/', authPacienteCtrl.login);
router.get('/list/:id', authPacienteCtrl.obtenerPsicologo);

export default router;