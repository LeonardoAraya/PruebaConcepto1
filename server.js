const express = require("express"); //Importar Framework de Express, facilitar la conexión con el servidor
const cors = require("cors"); //permite que el backend se comunique sin interrupciones, permite peticiones desde cualquier sitio
const { conectarDB } = require("./src/config/db"); //importar el archivo de configuración

const app = express(); //variable que permite el servidor web
app.use(express.json()); //permite que Express entienda y procese JSON
app.use(cors()); //permite la peticiones desde cualquier sitio


conectarDB(); //conectar a la base de datos al iniciar el servidor

// Importar rutas
//

const PORT = 3000; //puerto donde se ejecuta el servidor
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`)); //inicia servidor y lo deja escuchando en el puerto 3000