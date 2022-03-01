import jwt from 'jsonwebtoken';
require ('dotenv').config();

export const verifyJwtToken = async (bearerHeader) => {
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const jwtToken = bearer[1];

        if (!jwtToken) {
            return {
                msg: "FORBIDDEN"
            };
        }

        try {
            const data = await jwt.verify(jwtToken, `${process.env.SECRET_KEY}`);
            // console.log("Validator data", data);

            if (!data) {
                return {
                    msg: "UNAUTHORIZED"
                };
            }
            return data;
        } catch (error) {
            return {
                msg: "UNAUTHORIZED"
            };
        }
    } else {
        return {
            msg: "UNAUTHORIZED"
        };
    }
};