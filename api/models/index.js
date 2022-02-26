import Sequelize from "sequelize";
import {dbConfig} from "../config/dbConfig";

export let sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
