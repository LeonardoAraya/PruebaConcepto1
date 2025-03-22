const express = require("express");
const router = express.Router();
const sql = require("mssql"); 
const { conectarDB } = require("../config/db"); 

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

router.post("/empleados", async (req, res) => {
    const { nombre, salario } = req.body;

    if (!nombre || salario == null) {
        return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }

    try {
        await conectarDB(); // Conectar a la base de datos
        const pool = await sql.connect(); // Obtener conexión activa

        // Ejecutar el Stored Procedure con los parámetros
        let result = await pool.request()
            .input("inNombre", sql.VarChar(128), nombre)
            .input("inSalario", sql.Money, salario)
            .execute("SP_InsertarEmpleado");

        res.json({ message: "Empleado insertado correctamente." });
    } catch (error) {
        console.error("Error al insertar empleado:", error);
        res.status(500).json({ error: error.message || "Error al insertar el empleado." });
    }
});