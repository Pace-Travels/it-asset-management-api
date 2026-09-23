import express from "express";
import http from "http";

import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser"; // Cookie Parser Import kiya
import path from "path";
import { fileURLToPath } from "url";

import CONFIG from "./config/config.js";
import db from "./models/index.js";
import logger from "./services/logger.service.js";
import { init as socketInit } from "./services/socket.service.js";
import router from "./routes/index.js";
import errorMiddleware from "./middleware/error.middleware.js";
import seedData from "./services/seeder.service.js";

const app = express();
const server = http.createServer(app);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ===========================================
        Middlewares
=========================================== */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Cookies read karne ke liye middleware add kiya
app.use(compression());

// CORS Configuration (Credentials allow karne ke liye)
app.use(
    cors({
        origin: CONFIG.app.clientUrl || true, // Frontend URL ya true (bina origin filter ke credentials allow karne ke liye)
        credentials: true // Cookies transfer karne ke liye mandatory hai
    })
);

app.use(helmet());
app.use(morgan("dev"));

/* ===========================================
        Static Folder
=========================================== */

app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);

/* ===========================================
        Health API
=========================================== */

app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "IT Asset Management Backend Running"
    });
});

app.use('/api/Itam', router);

app.use(errorMiddleware);

/* ===========================================
        Socket
=========================================== */

socketInit(server);

/* ===========================================
        Database
=========================================== */

try {
    await db.sequelize.authenticate();
    console.log("✅ Database Connected");
    // await db.sequelize.sync();
    // await db.sequelize.sync({ alter: true });
    // await db.sequelize.sync({ force: true });
    console.log("✅ Tables Synced");

    // Initialize System Data
    await seedData();
} catch (error) {
    logger.error(error.message);
    console.log(error);
}

/* ===========================================
        Start Server
=========================================== */
server.listen(CONFIG.app.port, () => {
    console.log("====================================");
    console.log(`Server Running : http://localhost:${CONFIG.app.port}`);
    console.log("====================================");
});