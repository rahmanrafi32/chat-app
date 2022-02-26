require('dotenv').config();

export const dbConfig = {
    host: `${process.env.DB_HOST}`,
    username: `${process.env.DB_USER_NAME}`,
    password: `${process.env.DB_PASS}`,
    database: `${process.env.DB_NAME}`,
    dialect: `${process.env.DB_DIALECT}`
}