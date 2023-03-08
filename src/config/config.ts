import dotenv from 'dotenv';

dotenv.config()

const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_PORT = process.env.MONGO_PORT || 1337;
const MONGO_URL = `mongodb://mongo:${MONGO_PASSWORD}@containers-us-west-73.railway.app:${MONGO_PORT}`;

const SERVER_PORT = process.env.PORT ? process.env.PORT : Number(process.env.SERVER_PORT);

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
};