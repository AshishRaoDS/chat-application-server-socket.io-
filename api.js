const express = require('express');
const authRouter = require('./router/auth.router');

const api = express.Router();

api.use('/auth', authRouter);
// api.use('/user', userDetailsRouter);