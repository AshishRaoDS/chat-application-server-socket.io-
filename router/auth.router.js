const express = require('express');
const { loginHandler } = require('../controllers');

const router = express.Router();

router.post('/login', loginHandler);