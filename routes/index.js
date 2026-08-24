import { Router } from "express";
import moduleRoutes from "./module/index.js";
import assetInformationRoutes from "./module/assetInformation.routes.js";
import vendorManagement from './module/vendorManagement.routes.js';
import employeeDetails from './module/employeeDetails.routes.js';
import serverManagement from "./module/serverManagement.routes.js";
import monitoringMaintenance from "./module/monitoringMaintenance.routes.js";
import softwareLicenseManagement from "./module/softwareLicenseManagement.routes.js";
import emailAccountManagement from "./module/emailAccountManagement.routes.js";
import domainWebsiteManagement from "./module/domainWebsiteManagement.routes.js";
import sslCertificateManagement from "./module/sslCertificateManagement.routes.js";
import cloudSubscriptionManagement from "./module/cloudSubscriptionManagement.routes.js";
import internetManagement from "./module/internetManagement.routes.js";
import mobileRechargeManagement from "./module/mobileRechargeManagement.routes.js";
import employeeAssetAllocation from "./module/employeeAssetAllocation.routes.js";
import subscription from "./module/subscription.routes.js";
import userRole from "./module/userRole.routes.js";
import admin from "./module/admin.routes.js";
import menu from "./module/menu.routes.js";
import rolePermission from "./module/role-permisssion.routes.js"; // Standardized

const router = Router();

router.use('/master-Common-module', moduleRoutes);
router.use('/asset-information', assetInformationRoutes);
router.use('/vendor-management', vendorManagement);
router.use('/employee-details', employeeDetails);
router.use('/server-management', serverManagement);
router.use('/monitoring-maintenance', monitoringMaintenance);
router.use('/software-license-management', softwareLicenseManagement); // Fixed here
router.use('/email-account-management', emailAccountManagement);
router.use('/domain-website-management', domainWebsiteManagement);
router.use('/ssl-certificate-management', sslCertificateManagement);
router.use('/cloud-subscription-management', cloudSubscriptionManagement);
router.use('/internet-management', internetManagement);
router.use('/mobile-recharge-management', mobileRechargeManagement);
router.use('/employee-asset-allocation', employeeAssetAllocation);
router.use('/subscription', subscription);
router.use('/user-role', userRole);
router.use('/admin', admin);
router.use('/menu', menu);
router.use('/role-permission', rolePermission);

export default router;