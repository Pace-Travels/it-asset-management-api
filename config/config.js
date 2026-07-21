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

        database : process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        dialect: "mysql",
        logging:false
    },

    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: "1d"
    }
};

export default CONFIG;