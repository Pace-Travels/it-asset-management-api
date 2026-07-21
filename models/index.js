import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { Sequelize, DataTypes } from "sequelize";

import CONFIG from "../config/config.js";
import logger from "../services/logger.service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);

const db = {};

const sequelize = new Sequelize(

    CONFIG.database.database,
    CONFIG.database.username,
    CONFIG.database.password,

    {

        host: CONFIG.database.host,
        port: CONFIG.database.port,
        dialect: CONFIG.database.dialect,
        logging: CONFIG.database.logging
            ? (msg) => logger.debug(msg)
            : false,
        pool: {
            max: 20,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }

);

const files = fs.readdirSync(__dirname)

.filter(file =>

    file !== basename &&
    file.endsWith(".js")

);

for (const file of files) {
    console.log(file)
    const modelPath = pathToFileURL(
        path.join(__dirname, file)
    ).href;
    const module = await import(modelPath);
    if (module.default) {
        const model = module.default(
            sequelize,
            DataTypes
        );
        db[model.name] = model;
    }

}

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize

db.Sequelize = Sequelize;

export default db;