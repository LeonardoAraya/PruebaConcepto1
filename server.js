const express = require("express"); 
const cors = require("cors");
const path = require("path");
const { conectarDB } = require("./src/config/db");

const app = express();
app.use(express.json());
app.use(cors());

conectarDB();

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "src", "assets"))); 
app.use(express.static(path.join(__dirname, "src", "Views"))); 

// Rutas de la API
const empleadosRoutes = require("./src/Routes/EmpleadosRoutes");
app.use("/api", empleadosRoutes);

// Rutas para HTML
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src", "Views", "index.html"));
});

app.get("/insertar", (req, res) => {
    res.sendFile(path.join(__dirname, "src", "Views", "insertar.html"));
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
