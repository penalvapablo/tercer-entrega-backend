import express from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import passport from 'passport';
import './config/db.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));


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
 * -------------- SESSION SETUP ----------------
 */
app.use(
  session({
    secret: 'secret123',
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 60000,
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

// Global variables
const PORT = process.env.PORT;

// Rutas
routes(app);

app.listen(PORT, () => {
  console.log(`server on http://localhost:${PORT}`);
});
