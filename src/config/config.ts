import dotenv from 'dotenv'
dotenv.config()

const MONGO_URL = process.env.MONGO_URL || ''
const PORT = process.env.PORT ? +process.env.PORT : 3003

export const config = {
    mongo: {
        url: MONGO_URL
    },
    port: PORT
}