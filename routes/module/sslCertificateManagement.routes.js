import express from "express";

import * as SSLCertificateManagementController from "../../controllers/sslCertificateManagement.controller.js";

const router = express.Router();

/* ===========================================================
    SSL Certificate Management
=========================================================== */

router.post(
    "/",
    SSLCertificateManagementController.add
);

router.get(
    "/",
    SSLCertificateManagementController.fetchAll
);

router.get(
    "/:id",
    SSLCertificateManagementController.fetchSingle
);

router.put(
    "/:id",
    SSLCertificateManagementController.update
);

router.delete(
    "/:id",
    SSLCertificateManagementController.remove
);

router.patch(
    "/:id",
    SSLCertificateManagementController.changeStatus
);

export default router;