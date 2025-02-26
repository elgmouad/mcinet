import fs from "fs";
import path from "path";
import mysql from 'mysql2/promise';


export const connectSQL = async () => {

    try {
        const connection = await mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          port: process.env.DB_PORT,
          waitForConnections: true,
          connectionLimit: 10, 
          queueLimit: 0
        });
    
        console.log('Connected to the MySQL database.', process.env.DB_NAME , ' ', process.env.DB_WB);

        return connection;
      } catch (error) {
        console.error('Error conect to the database:', error);
      }
}
