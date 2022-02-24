import {sequelize} from "./models";

sequelize.authenticate().then(() => console.log("database connected")).catch(err => console.log(err))