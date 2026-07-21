import { Router } from "express";
import moduleRoutes from "./module/index.js";
import assetInformationRoutes from "./module/assetInformation.routes.js";

const router = Router();

router.use('/master-Common-module', moduleRoutes);
router.use('/asset-information', assetInformationRoutes);

export default router;