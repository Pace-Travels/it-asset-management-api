import dotenv from 'dotenv';

dotenv.config();

const CONFIG = {
    app: {
        port: process.env.PORT || 5500,
        env: process.env.NODE_ENV || "development"
    },

    database: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,

        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        dialect: "mysql",
        logging: false
    },

    jwt: {

        accessSecret: process.env.JWT_ACCESS_SECRET,

        refreshSecret: process.env.JWT_REFRESH_SECRET,

        accessExpire: process.env.JWT_ACCESS_EXPIRE,

        refreshExpire: process.env.JWT_REFRESH_EXPIRE

    }
};

export default CONFIG;