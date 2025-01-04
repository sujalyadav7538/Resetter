import mysql from "mysql2/promise";

let connection;

async function createConnection() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'resetter',
      password: process.env.DB_PASSWORD,
    });
    console.log("Connected to the MySQL database.");
  }
  return connection;
}

export default createConnection;
