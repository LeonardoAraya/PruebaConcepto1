require("dotenv").config(); //carga las variables de entorno desde el archivo .env
const sql = require("mssql"); //conexión de librería para poder hacer la conexión con MSSQL

const config = { //configuración de la conexión con SQL Server
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: process.env.DB_ENCRYPT === "true",
        enableArithAbort: true,
    },
};

async function conectarDB() { //manejar la conexión
    try {
        await sql.connect(config);
        console.log("Conectado a la base de datos"); //conexión exitosa
    } catch (error) {
        console.error("Error de conexión:", error); //conexión fallida
    }
}

module.exports = { sql, conectarDB }; //exportar la base de datos