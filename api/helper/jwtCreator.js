import jwt from 'jsonwebtoken';
import {AuthenticationError} from "apollo-server-core";

require('dotenv').config();
const accessToken = (payload) => {
    // console.log("payload of jwt", payload);

    return jwt.sign(
        {
            ...payload,
            iss: "Chat_App",
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 1800
        },
        `${process.env.SECRET_KEY}`,
    );
};

const refreshToken = (payload) => {
    // console.log("payload of refresh", payload);

    return jwt.sign(
        {
            ...payload,
            iss: "Chat_App",
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 3.156e+7
        },
        `${process.env.SECRET_KEY}`
    );
};

export {
    accessToken,
    refreshToken
}