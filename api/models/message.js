import {sequelize} from "./index";
import Sequelize from "sequelize";

export const Message = sequelize.define("message", {
            text: {
                type: Sequelize.STRING,
                allowNull: false
            },
            from: {
                type: Sequelize.STRING,
                allowNull: false
            },
            to: {
                type: Sequelize.STRING,
                allow: false
            },

        });