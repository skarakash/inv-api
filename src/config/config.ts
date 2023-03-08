import dotenv from 'dotenv';

dotenv.config()

const MONGO_PASSWORD = process.env.MONGOPASSWORD || "";
const MONGO_PORT = process.env.MONGOPORT || 1337;
const MONGO_USER = process.env.MONGOUSER || "";
const MONGO_HOST = process.env.MONGOHOST || "";

const MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`;

const SERVER_PORT = process.env.PORT ? process.env.PORT : Number(process.env.SERVER_PORT);

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
};