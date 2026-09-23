import model from '../models/index.js';
import bcrypt from 'bcryptjs';
import logger from './logger.service.js';
import ROLES from '../constants/roles.js';

const seedData = async () => {
    try {
        console.log("🌱 Starting System Data Initialization...");

        // ==========================================
        // 1. Seed User Role Status
        // ==========================================
        console.log("   - Seeding User Role Status...");

        const [activeRoleStatus] = await model.UserRoleStatus.findOrCreate({
            where: { name: "Active" },
            defaults: {
                name: "Active",
                description: "Active Role",
                isActive: true,
                isDeleted: false
            }
        });

        // ==========================================
        // 2. Seed Roles
        // ==========================================
        console.log("   - Seeding Roles...");

        const rolesList = [
            { name: ROLES.SUPER_ADMIN, code: "SA", description: "System Administrator with all privileges" },
            { name: ROLES.ADMIN, code: "AD", description: "Administrator" },
            { name: ROLES.MANAGER, code: "MG", description: "Manager" },
            { name: ROLES.USER, code: "US", description: "Standard User" }
        ];

        const roleMap = {};

        for (const roleData of rolesList) {
            const [role] = await model.UserRole.findOrCreate({
                where: { name: roleData.name },
                defaults: {
                    ...roleData,
                    userRoleStatusId: activeRoleStatus.id,
                    isActive: true,
                    isDeleted: false
                }
            });

            if (!role.userRoleStatusId) {
                await role.update({ userRoleStatusId: activeRoleStatus.id });
            }

            roleMap[roleData.name] = role;
        }

        const superAdminRole = roleMap[ROLES.SUPER_ADMIN];

        // ==========================================
        // 3. Seed Permissions
        // ==========================================
        console.log("   - Seeding Permissions...");
        const permissions = [
            { name: 'DASHBOARD_VIEW', description: 'Can view dashboard' },
            { name: 'MASTER_VIEW', description: 'Can view masters' },
            { name: 'REPORT_VIEW', description: 'Can view reports' },
            { name: 'MASTER_USER', description: 'Can view user master' },
            { name: 'MASTER_DEPARTMENT', description: 'Can view department master' }
        ];

        const permissionMap = {};
        for (const p of permissions) {
            const [perm] = await model.Permission.findOrCreate({
                where: { name: p.name },
                defaults: { ...p, isActive: true, isDeleted: false }
            });
            permissionMap[p.name] = perm.id;
        }

        // ==========================================
        // 4. Seed Menus (with PrimeIcons)
        // ==========================================
        console.log("   - Seeding Menus with PrimeIcons and Role Permissions...");

        const menusToSeed = [
            // Main Parent Menus (Level 1)
            { name: 'Dashboard', route: '/dashboard', icon: 'pi pi-home', permission: 'DASHBOARD_VIEW', sortOrder: 1, level: 1 },
            { name: 'Masters', route: '', icon: 'pi pi-folder', permission: 'MASTER_VIEW', sortOrder: 2, level: 1 },
            { name: 'Settings', route: '', icon: 'pi pi-cog', permission: 'MASTER_VIEW', sortOrder: 3, level: 1 },
            { name: 'Sub Masters', route: '', icon: 'pi pi-folder-open', permission: 'MASTER_VIEW', sortOrder: 4, level: 1 }, // Last Position

            // Children under "Masters"
            { name: 'Asset Information', route: '/asset-info', icon: 'pi pi-desktop', permission: 'MASTER_VIEW', sortOrder: 1, parent: 'Masters', level: 2 },
            { name: 'Vendor Management', route: '/vendor-management', icon: 'pi pi-building', permission: 'REPORT_VIEW', sortOrder: 2, parent: 'Masters', level: 2 },
            { name: 'Employee Details', route: '/employee-details', icon: 'pi pi-users', permission: 'REPORT_VIEW', sortOrder: 3, parent: 'Masters', level: 2 },
            { name: 'Asset Allocation', route: '/employee-asset-allocation', icon: 'pi pi-user-plus', permission: 'MASTER_VIEW', sortOrder: 4, parent: 'Masters', level: 2 },
            { name: 'Server Management', route: '/server-managment', icon: 'pi pi-server', permission: 'MASTER_VIEW', sortOrder: 5, parent: 'Masters', level: 2 },
            { name: 'Domain Website', route: '/domain-website', icon: 'pi pi-globe', permission: 'MASTER_VIEW', sortOrder: 6, parent: 'Masters', level: 2 },
            { name: 'SSL Certificate', route: '/ssl-certificate-management', icon: 'pi pi-shield', permission: 'MASTER_VIEW', sortOrder: 7, parent: 'Masters', level: 2 },
            { name: 'Software License', route: '/software-license-management', icon: 'pi pi-key', permission: 'MASTER_VIEW', sortOrder: 8, parent: 'Masters', level: 2 },
            { name: 'Email Account', route: '/email-account-management', icon: 'pi pi-envelope', permission: 'MASTER_VIEW', sortOrder: 9, parent: 'Masters', level: 2 },
            { name: 'Subscription', route: '/subscription', icon: 'pi pi-credit-card', permission: 'MASTER_VIEW', sortOrder: 10, parent: 'Masters', level: 2 },
            { name: 'Cloud Subscription', route: '/cloud-subscription-management', icon: 'pi pi-cloud', permission: 'MASTER_VIEW', sortOrder: 11, parent: 'Masters', level: 2 },
            { name: 'Mobile Recharge', route: '/mobile-recharge-management', icon: 'pi pi-mobile', permission: 'MASTER_VIEW', sortOrder: 12, parent: 'Masters', level: 2 },
            { name: 'Internet Management', route: '/internet-management', icon: 'pi pi-wifi', permission: 'MASTER_VIEW', sortOrder: 13, parent: 'Masters', level: 2 },
            { name: 'Monitoring Maintenance', route: '/monitoring-maintenance', icon: 'pi pi-wrench', permission: 'MASTER_VIEW', sortOrder: 14, parent: 'Masters', level: 2 },

            // Children under "Settings"
            { name: 'Menus', route: '/menus', icon: 'pi pi-list', permission: 'MASTER_VIEW', sortOrder: 1, parent: 'Settings', level: 2 },
            { name: 'Role Permissions', route: '/role-permission', icon: 'pi pi-lock', permission: 'REPORT_VIEW', sortOrder: 2, parent: 'Settings', level: 2 },
            { name: 'Admin Users', route: '/adminUser', icon: 'pi pi-user-edit', permission: 'REPORT_VIEW', sortOrder: 3, parent: 'Settings', level: 2 },

            // Children under "Sub Masters"
            { name: 'Asset Information Category', route: '/asset-info-categaory', icon: 'pi pi-tags', permission: 'MASTER_VIEW', sortOrder: 1, parent: 'Sub Masters', level: 2 },
            { name: 'Asset Information Status', route: '/asset-info-status', icon: 'pi pi-check-square', permission: 'MASTER_USER', sortOrder: 2, parent: 'Sub Masters', level: 2 },
            { name: 'Server Management Category', route: '/server-mngt-category', icon: 'pi pi-tags', permission: 'MASTER_VIEW', sortOrder: 3, parent: 'Sub Masters', level: 2 },
            { name: 'Server Management Status', route: '/server-mngt-status', icon: 'pi pi-check-circle', permission: 'MASTER_VIEW', sortOrder: 4, parent: 'Sub Masters', level: 2 },
            { name: 'Monitoring Backup Status', route: '/monitoring-backup-status', icon: 'pi pi-database', permission: 'MASTER_VIEW', sortOrder: 5, parent: 'Sub Masters', level: 2 },
            { name: 'Monitoring Server Health Status', route: '/monitoring-server-health-status', icon: 'pi pi-heart-fill', permission: 'MASTER_VIEW', sortOrder: 6, parent: 'Sub Masters', level: 2 },
            { name: 'Mobile Recharge Status', route: '/mobile-recharge-status', icon: 'pi pi-check-square', permission: 'MASTER_VIEW', sortOrder: 7, parent: 'Sub Masters', level: 2 },
            { name: 'Software License Category', route: '/software-license-category', icon: 'pi pi-tags', permission: 'MASTER_VIEW', sortOrder: 8, parent: 'Sub Masters', level: 2 },
            { name: 'Email Account Status', route: '/email-account-status', icon: 'pi pi-check-square', permission: 'MASTER_VIEW', sortOrder: 9, parent: 'Sub Masters', level: 2 },
            { name: 'Cloud Subscription Service', route: '/cloud-subs-service', icon: 'pi pi-cloud-upload', permission: 'MASTER_VIEW', sortOrder: 10, parent: 'Sub Masters', level: 2 },
            { name: 'Renewal Reminder Type', route: '/renewal-reminder-type', icon: 'pi pi-bell', permission: 'MASTER_VIEW', sortOrder: 11, parent: 'Sub Masters', level: 2 },
            { name: 'User Role Status', route: '/user-role-status', icon: 'pi pi-info-circle', permission: 'MASTER_VIEW', sortOrder: 12, parent: 'Sub Masters', level: 2 },
            { name: 'User Permission Type', route: '/user-permission-type', icon: 'pi pi-key', permission: 'MASTER_VIEW', sortOrder: 13, parent: 'Sub Masters', level: 2 },
            { name: 'Departments', route: '/department', icon: 'pi pi-sitemap', permission: 'MASTER_DEPARTMENT', sortOrder: 14, parent: 'Sub Masters', level: 2 },
            { name: 'Subscription Payment Method', route: '/subscription-payment-method', icon: 'pi pi-wallet', permission: 'MASTER_VIEW', sortOrder: 15, parent: 'Sub Masters', level: 2 },
            { name: 'Subscription Reminder Type', route: '/subscription-reminder-type', icon: 'pi pi-calendar', permission: 'MASTER_VIEW', sortOrder: 16, parent: 'Sub Masters', level: 2 },
            { name: 'User Type', route: '/user-type', icon: 'pi pi-id-card', permission: 'MASTER_VIEW', sortOrder: 17, parent: 'Sub Masters', level: 2 },
            { name: 'Admin Type', route: '/admin-type', icon: 'pi pi-user', permission: 'MASTER_VIEW', sortOrder: 18, parent: 'Sub Masters', level: 2 },
            { name: 'Admin Status', route: '/admin-status', icon: 'pi pi-sliders-h', permission: 'MASTER_VIEW', sortOrder: 19, parent: 'Sub Masters', level: 2 },
            { name: 'Permissions', route: '/permission', icon: 'pi pi-verified', permission: 'MASTER_VIEW', sortOrder: 20, parent: 'Sub Masters', level: 2 },
            { name: 'SSL Certificate Status', route: '/ssl-certificate-management-status', icon: 'pi pi-shield', permission: 'MASTER_VIEW', sortOrder: 21, parent: 'Sub Masters', level: 2 }
        ];

        const menuMap = {};
        for (const m of menusToSeed) {
            let parentId = null;
            if (m.parent && menuMap[m.parent]) {
                parentId = menuMap[m.parent];
            }
            const [menuItem] = await model.Menu.findOrCreate({
                where: { name: m.name },
                defaults: {
                    name: m.name,
                    route: m.route,
                    icon: m.icon,
                    level: m.level,
                    sortOrder: m.sortOrder,
                    parentId: parentId,
                    isActive: true,
                    isDeleted: false
                }
            });

            // Update details including icon
            await menuItem.update({
                route: m.route,
                icon: m.icon,
                level: m.level,
                sortOrder: m.sortOrder,
                parentId: parentId,
            });

            menuMap[m.name] = menuItem.id;

            // Seed Role Permissions for Super Admin
            const permId = permissionMap[m.permission];
            if (permId && superAdminRole) {
                await model.RolePermission.findOrCreate({
                    where: { roleId: superAdminRole.id, menuId: menuItem.id, permissionId: permId },
                    defaults: {
                        roleId: superAdminRole.id,
                        menuId: menuItem.id,
                        permissionId: permId,
                        isActive: true,
                        isDeleted: false
                    }
                });
            }
        }

        // ==========================================
        // 5. Seed Master Data Tables
        // ==========================================
        console.log("   - Seeding Master Data Tables...");

        const seedMaster = async (Model, records) => {
            if (!Model) return;
            for (const record of records) {
                await Model.findOrCreate({
                    where: { name: record.name },
                    defaults: { ...record, isActive: true, isDeleted: false }
                });
            }
        };

        await seedMaster(model.AdminStatus, [
            { name: 'Active', description: 'Active Admin Account' },
            { name: 'Inactive', description: 'Inactive Admin Account' },
            { name: 'Blocked', description: 'Blocked Admin Account' }
        ]);

        await seedMaster(model.AdminType, [
            { name: 'System Administrator', description: 'Full system control' },
            { name: 'IT Administrator', description: 'IT level control' }
        ]);

        await seedMaster(model.UserRoleStatus, [
            { name: 'Active', description: 'Active Role' },
            { name: 'Inactive', description: 'Inactive Role' }
        ]);

        await seedMaster(model.UserType, [
            { name: 'Internal Employee', description: 'Company Employee' },
            { name: 'Contractual', description: 'Contractor or Freelancer' }
        ]);

        await seedMaster(model.Department, [
            { name: 'IT', description: 'Information Technology' },
            { name: 'HR', description: 'Human Resources' },
            { name: 'Finance', description: 'Finance and Accounting' },
            { name: 'Operations', description: 'Business Operations' },
            { name: 'Sales', description: 'Sales and Marketing' }
        ]);

        await seedMaster(model.AssetInformationStatus, [
            { name: 'Available', description: 'Asset is available for allocation' },
            { name: 'In Use', description: 'Asset is currently allocated' },
            { name: 'In Maintenance', description: 'Asset is under repair or maintenance' },
            { name: 'Discarded', description: 'Asset is discarded or retired' }
        ]);

        await seedMaster(model.AssetInformationCategory, [
            { name: 'Laptop', description: 'Portable Computers' },
            { name: 'Desktop', description: 'Workstation Computers' },
            { name: 'Monitor', description: 'External Displays' },
            { name: 'Accessories', description: 'Keyboard, Mouse, Headsets, etc.' },
            { name: 'Printer', description: 'Printers and Scanners' }
        ]);

        await seedMaster(model.ServerManagementCategory, [
            { name: 'Physical Server', description: 'On-premise bare-metal server' },
            { name: 'Virtual Machine', description: 'VM on hypervisor' },
            { name: 'Cloud Instance', description: 'Cloud based computing instance' }
        ]);

        await seedMaster(model.ServerManagementStatus, [
            { name: 'Running', description: 'Server is up and running' },
            { name: 'Stopped', description: 'Server is powered off' },
            { name: 'Terminated', description: 'Server is deleted' },
            { name: 'Maintenance', description: 'Server is under maintenance' }
        ]);

        await seedMaster(model.MonitoringBackupStatus, [
            { name: 'Success', description: 'Backup completed successfully' },
            { name: 'Pending', description: 'Backup is in progress' },
            { name: 'Failed', description: 'Backup failed' }
        ]);

        await seedMaster(model.MonitoringServerHealthStatus, [
            { name: 'Healthy', description: 'Server is healthy' },
            { name: 'Warning', description: 'Server health is at warning level' },
            { name: 'Critical', description: 'Server health is critical' }
        ]);

        await seedMaster(model.MobileRechargeManagementStatus, [
            { name: 'Active', description: 'Recharge is currently active' },
            { name: 'Expired', description: 'Recharge has expired' }
        ]);

        await seedMaster(model.SoftwareLicenseRenewalManagementCategory, [
            { name: 'Operating System', description: 'OS Licenses' },
            { name: 'IDE', description: 'Integrated Development Environments' },
            { name: 'Productivity Suite', description: 'Office, Docs, Spreadsheets' },
            { name: 'Database', description: 'Database management software' }
        ]);

        await seedMaster(model.EmailAccountRenewalManagementStatus, [
            { name: 'Active', description: 'Email account is active' },
            { name: 'Suspended', description: 'Email account is suspended' }
        ]);

        await seedMaster(model.CloudSubscriptionManagementService, [
            { name: 'Amazon Web Services (AWS)', description: 'AWS Cloud Services' },
            { name: 'Microsoft Azure', description: 'Azure Cloud Services' },
            { name: 'Google Cloud Platform (GCP)', description: 'GCP Services' },
            { name: 'DigitalOcean', description: 'DigitalOcean Droplets and Services' }
        ]);

        await seedMaster(model.RenewalReminderManagementReminderType, [
            { name: 'Email', description: 'Email Notification' },
            { name: 'SMS', description: 'SMS Notification' },
            { name: 'Push Notification', description: 'App Push Notification' }
        ]);

        await seedMaster(model.UserPermissionType, [
            { name: 'Read', description: 'View only access' },
            { name: 'Write', description: 'Create and update access' },
            { name: 'Delete', description: 'Deletion access' },
            { name: 'Full Access', description: 'All permissions' }
        ]);

        await seedMaster(model.SubscriptionPaymentMethod, [
            { name: 'Credit Card', description: 'Payment via Credit Card' },
            { name: 'Bank Transfer', description: 'Direct Bank Transfer' },
            { name: 'PayPal', description: 'Payment via PayPal' }
        ]);

        await seedMaster(model.SubscriptionReminderType, [
            { name: 'Daily', description: 'Remind every day' },
            { name: 'Weekly', description: 'Remind every week' },
            { name: 'Monthly', description: 'Remind every month' },
            { name: 'Yearly', description: 'Remind every year' }
        ]);

        await seedMaster(model.SSLCertificateManagementStatus, [
            { name: 'Active', description: 'Certificate is valid' },
            { name: 'Expiring Soon', description: 'Certificate will expire shortly' },
            { name: 'Expired', description: 'Certificate has expired' },
            { name: 'Revoked', description: 'Certificate has been revoked' }
        ]);

        // ==========================================
        // 6. Seed First Admin User
        // ==========================================
        console.log("   - Seeding Admin User...");
        const adminCount = await model.Admin.count();
        if (adminCount === 0 && superAdminRole) {
            const [adminStatus] = await model.AdminStatus.findOrCreate({ where: { name: 'Active' }, defaults: { name: 'Active' } });
            const [userType] = await model.UserType.findOrCreate({ where: { name: 'Internal Employee' }, defaults: { name: 'Internal Employee' } });

            const hashedPassword = await bcrypt.hash('admin@123', 10);
            await model.Admin.create({
                employeeCode: 'ADMIN001',
                firstName: 'Super',
                lastName: 'Admin',
                email: 'admin@itam.com',
                mobileNumber: '9999999999',
                password: hashedPassword,
                userRoleId: superAdminRole.id,
                adminStatusId: adminStatus.id,
                userTypeId: userType.id,
                isActive: true,
                isDeleted: false
            });
            console.log("👤 Default Super Admin created: admin@itam.com / admin@123");
        }

        console.log("✅ System Data Initialization Complete");
    } catch (error) {
        console.error("❌ Error during System Data Initialization:", error);
    }
};

export default seedData;