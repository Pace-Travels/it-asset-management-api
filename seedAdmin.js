// seedAdmin.js
import db from "./models/index.js";
import bcrypt from "bcryptjs";

const createFirstAdmin = async () => {
    try {
        await db.sequelize.authenticate();
        console.log("Database connected...");

        // Password hash karein
        const hashedPassword = await bcrypt.hash("Admin@123", 10);

        const admin = await db.Admin.create({
            employeeCode: "ADM001",
            firstName: "Super",
            lastName: "Admin",
            email: "admin@example.com",
            mobileNumber: "9876543210",
            password: hashedPassword,
            isActive: true,
            isDeleted: false
            // Agar UserRole ya Department IDs optional hain ya default IDs hain toh wahan dalein
        });

        console.log("✅ First Admin Created Successfully!");
        console.log("Email: admin@example.com");
        console.log("Password: Admin@123");
        process.exit();
    } catch (error) {
        console.error("❌ Error creating admin:", error.message);
        process.exit(1);
    }
};

createFirstAdmin();