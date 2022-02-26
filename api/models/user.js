import {sequelize} from "./index";
import Sequelize from "sequelize";

export const User = sequelize.define("user", {
    username: {
        type: Sequelize.STRING,
        unique: {
            args: true,
            msg: "User name is already taken"
        },
        validate: {
            notEmpty: {
                args: true,
                msg: "User name cant be empty"
            }
        }
    },
    email: {
        type: Sequelize.STRING,
        unique: {
            args: true,
            msg: "Email is already registered"
        },
        validate: {
            notEmpty: {
                args: true,
                msg: "Email cant be empty"
            }
        }
    },
    password: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: {
                args: true,
                msg: "Password cant be empty"
            }
        }
    },
    profilePic: {
        type: Sequelize.STRING
    },
})