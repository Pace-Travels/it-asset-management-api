import express from "express";
import masterRoutes from "./master.routes.js";

const router = express.Router();

router.use("/", masterRoutes);

export default router;