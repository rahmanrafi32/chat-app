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
            len:{
                args:[2],
                msg:'User name is too short'
            },
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
            is: {
                args: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                msg: "Enter a valid email"
            },
            notEmpty: {
                args: true,
                msg: "Email cant be empty"
            }
        }
    },
    password: {
        type: Sequelize.STRING,
        validate: {
            is: {
                args: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                msg: "Enter a valid password"
            },
            notEmpty: {
                args: true,
                msg: "Password cant be empty"
            }
        }
    },
    profilePic: {
        type: Sequelize.STRING
    },
});