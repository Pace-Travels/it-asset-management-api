import { Router } from "express";
import moduleRoutes from "./module/index.js";

const router = Router();

router.use('/master-Common-module', moduleRoutes);

export default router;