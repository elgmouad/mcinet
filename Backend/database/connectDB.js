import fs from "fs";
import path from "path";
import mysql from 'mysql2/promise';


// Variable qui stocke l'instance unique
let connection = null;

// export const connectSQL = async () => {
//   try {
//     if (!connection) {
//       console.log("🔄 Création d'une nouvelle connexion MySQL...");
//       connection = await mysql.createConnection({
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_NAME,
//         port: process.env.DB_PORT,
//         waitForConnections: true,
//       });
//       console.log('✅ Connexion MySQL créée et réutilisable.');
//     } else {
//       console.log('♻️ Réutilisation de la connexion MySQL existante.');
//     }
//     return connection;
//   } catch (error) {
//     console.error('❌ Erreur de connexion à la base de données:', error);
//     mysql.
//     throw error;
//   }
// };
// Déclaration du pool en Singleton
let pool = null;

export const connectSQL = async () => {
  try {
    if (!pool) {
      console.log("🔄 Création du pool de connexions MySQL...");
      pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        waitForConnections: true,
        connectionLimit: 10,  // Nombre max de connexions simultanées
        queueLimit: 0          // Pas de limite sur la file d'attente
      });
      console.log("✅ Pool de connexions MySQL créé.");
    }
    return pool;
  } catch (error) {
    console.error("❌ Erreur lors de la création du pool MySQL :", error);
    throw error;
  }
};