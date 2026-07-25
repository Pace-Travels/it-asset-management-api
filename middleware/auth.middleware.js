import JwtService from "../services/jwt.service.js";
import model from "../models/index.js";
import { ReE } from "../services/util.service.js";

const authMiddleware = async (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return ReE(res, "Authorization token is required.", 401);
        }

        if (!authHeader.startsWith("Bearer ")) {
            return ReE(res, "Invalid authorization format.", 401);
        }

        const token = authHeader.split(" ")[1];

        let payload;

        try {

            payload = JwtService.verifyAccessToken(token);

        }

        catch (error) {

            return ReE(res, "Invalid or expired token.", 401);

        }

        const admin = await model.Admin.findOne({

            where: {

                id: payload.id,

                isDeleted: false

            }

        });

        if (!admin) {

            return ReE(res, "Admin not found.", 401);

        }

        if (!admin.isActive) {

            return ReE(res, "Admin account is inactive.", 403);

        }

        req.user = {

            id: admin.id,

            employeeCode: admin.employeeCode,

            firstName: admin.firstName,

            lastName: admin.lastName,

            email: admin.email,

            userRoleId: admin.userRoleId,

            userTypeId: admin.userTypeId,

            departmentId: admin.departmentId,

        };

        next();

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export default authMiddleware;