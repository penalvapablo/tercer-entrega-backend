import express from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import passport from 'passport';
import './config/db.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import cluster from 'cluster';
import os from 'os';
const numCPUs = os.cpus().length;
import logger from './utils/winston.js';

/**
 * -------------- GENERAL SETUP ----------------
 */
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');



/**
 * -------------- PRUEBAS ---------------------
 */
 import {Server} from 'socket.io'
 import httpModule from 'http';
 const http = httpModule.Server(app);
 const io = new Server(http);










 
/**
 * -------------- SESSION SETUP ----------------
 */
app.use(
  session({
    secret: 'secret123',
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 60000 * 60,
    },
    resave: false,
    saveUninitialized: false,
    rolling: true,
  })
);

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */
import './config/passport.js';

app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//   console.log(req.session);
//   console.log(req.user);
//   next();
// });

// Middlewares
app.use(cors(`${process.env.PORT}`));
app.use(cookieParser());

// Global variables
const PORT = process.env.PORT;

// Rutas
routes(app);

const mode = process.env.MODE;

if (mode === 'FORK') {
  const server = app.listen(PORT, () => {
    logger.log('info', `Servidor inicializado en el puerto ${PORT}`);
  });

  server.on('error', (err) => {
    logger.log('error', 'Error del servidor.' + err);
  });
  process.on('exit', (code) => {
    logger.log('info', 'Exit code -> ' + code);
  });
}
if (mode === 'CLUSTER') {
  if (cluster.isMaster) {
    console.log(`Master -> PID: ${process.pid}`);

    // Workers
    console.log('cpus..', numCPUs);
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
      logger.log('warn', `worker ${worker.process.pid} died`);
      cluster.fork();
    });
  } else {
    const server = app.listen(PORT, () => {
      logger.log(
        'info',
        `Servidor inicializado en el puerto ${server.address().port} con pid ${
          process.pid
        }.`
      );
    });

    server.on('error', (err) => {
      logger.log('error', 'Error del servidor.' + err);
      // console.log(e);
    });
    process.on('exit', (code) => {
      logger.log('info', 'Exit code -> ' + code);
    });
  }
}
