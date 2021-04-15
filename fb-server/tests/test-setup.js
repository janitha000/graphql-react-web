const { MONGO_TEST } = require('../config')
const mongoose = require('mongoose')

module.exports = {
    setupDB() {
        beforeAll(async () => {
            await mongoose.connect(MONGO_TEST, { useNewUrlParser: true, useUnifiedTopology: true })
        })

        afterEach(async () => {
            const collections = Object.keys(mongoose.connection.collections)
            for (const collectionName of collections) {
                const collection = mongoose.connection.collections[collectionName]
                await collection.deleteMany()
            }
        })

        afterAll(async () => {
            await mongoose.connection.close()
        })
    }
}