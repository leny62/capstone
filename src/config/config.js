import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.CONNECTION_URL,
    CONNECTION_URL: process.env.CONNECTION_URL,
    CONNECTION_URL12: process.env.CONNECTION_URL12,
    JWTKEY: process.env.JWTKEY,
    API_VERSION: process.env.API_VERSION
}