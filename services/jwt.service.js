import jwt from "jsonwebtoken";
import CONFIG from "../config/config.js";

class JwtService {

    generateAccessToken(admin) {

        return jwt.sign(

            {

                id: admin.id,

                email: admin.email,

                employeeCode: admin.employeeCode,

                userRoleId: admin.userRoleId,

                userTypeId: admin.userTypeId

            },

            CONFIG.jwt.accessSecret,

            {

                expiresIn: CONFIG.jwt.accessExpire

            }

        );

    }

    generateRefreshToken(admin) {

        return jwt.sign(

            {

                id: admin.id

            },

            CONFIG.jwt.refreshSecret,

            {

                expiresIn: CONFIG.jwt.refreshExpire

            }

        );

    }

    verifyAccessToken(token) {

        return jwt.verify(

            token,

            CONFIG.jwt.accessSecret

        );

    }

    verifyRefreshToken(token) {

        return jwt.verify(

            token,

            CONFIG.jwt.refreshSecret

        );

    }

    decodeToken(token) {

        return jwt.decode(token);

    }

}

export default new JwtService();