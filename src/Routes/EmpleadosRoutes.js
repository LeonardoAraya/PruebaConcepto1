const express = require("express");
const router = express.Router();
const sql = require("mssql"); // Importar mssql
const { conectarDB } = require("../config/db"); // Importar la conexión a la BD

router.get("/empleados", async (req, res) => {
    try {
        await conectarDB(); // Asegurar la conexión antes de ejecutar la consulta
        const pool = await sql.connect(); // Obtener conexión activa
        const result = await pool.request().query("EXEC SP_ObtenerEmpleado"); // Llamar al SP
        res.json(result.recordset); // Enviar los datos como JSON
    } catch (error) {
        console.error("Error al obtener empleados:", error);
        res.status(500).json({ error: "Error al obtener empleados" });
    }
});

module.exports = router;
