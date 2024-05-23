
import 'dotenv/config'
import mysql from 'mysql';

export const db = mysql.createConnection({
    host: process.env.DB_HOSt,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

