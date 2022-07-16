import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes'
import authPaciente from './routes/authPaciente.routes'
import usuarioRoutes from './routes/usuario.routes'
import solicitudRoutes from './routes/solicitud.routes'
import pacienteRoutes from './routes/paciente.routes'
import reporteRoutes from './routes/reporte.routes'


const app = express();
var cors = require('cors');

app.use(express.json());
app.use(cors());

app.use(morgan('dev'));

app.get('/', function(req, res, next) {
    res.send('SERVIDOR LEVANTADO CORRECTAMENTE...!');
});

app.use('/auth', authRoutes);
app.use('/authPaciente', authPaciente);
app.use('/usuario', usuarioRoutes);
app.use('/solicitud', solicitudRoutes);
app.use('/paciente', pacienteRoutes);
app.use('/reporte', reporteRoutes);

export default app;