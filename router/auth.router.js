const express = require('express');
const { loginHandler, signupHandler, decodeHandler } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/login', loginHandler);

router.post('/signup', signupHandler)

router.get('/decode', decodeHandler)

module.exports = router