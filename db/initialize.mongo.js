const { MongoClient } = require('mongodb');

const MongoURL = 'mongodb://localhost:27017'

async function initializeDataBase() {
    const client = new MongoClient(MongoURL)
    await client.connect()
    await client.db('chat-application').command({ ping: 1 })

    return await client.db('chat-application')
}

module.exports = {
    initializeDataBase
} 