const jwt = require('jsonwebtoken')
const SECRET_KEY = "abcdefgh123456789"
const { MongoClient } = require('mongodb');
const { initializeDataBase } = require('../db/initialize.mongo');



function loginHandler(req, res) {
    // Get the user details
    // Check with the database 
    // Once confirmed send an access token

}

async function signupHandler(req, res) {
    const client = await initializeDataBase()
    const userProfiles = client.collection('users')
    const { email, password } = req.body
    const token = jwt.sign({ email }, SECRET_KEY)
    const existingUser = await userProfiles.findOne({ email })

    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' })
    }

    await userProfiles.insertOne({ email, password })

     res.status(200).json({ token })
}

async function decodeHandler(req, res) {
const token = req.query.token
const data = jwt.decode(token)

return res.status(200).json({email: data.email})
}

module.exports = {
    loginHandler,
    signupHandler,
    decodeHandler
};