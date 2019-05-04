import * as path from 'path';
import * as dotenv from "dotenv";
dotenv.config();

import * as logger from 'morgan';
import * as express from 'express';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';

import authRouter from './routes/auth';
import jobsRouter from './routes/jobs';
import indexRouter from './routes/index';
import settingsRouter from './routes/settings';
import algorithmsRouter from './routes/algorithms';

import { setupPassport } from './helpers/auth';
import { setupMongoose } from './helpers/mongoose';

const app = express();
setupMongoose();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));

setupPassport();

app.use('/', indexRouter);

app.use('/auth', authRouter);
app.use('/jobs', jobsRouter);
app.use('/settings', settingsRouter);
app.use('/algorithms', algorithmsRouter);

export default app;
