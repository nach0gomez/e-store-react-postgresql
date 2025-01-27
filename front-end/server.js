const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el paquete 'cors'

const app = express();
const port = 3004;


app.use(cors()); // Permite todas las solicitudes desde cualquier origen



// Configuración de SQLite y creación de la tabla con nombre ecommerce
const db = new sqlite3.Database('ecommerce.sqlite');
db.run('CREATE TABLE IF NOT EXISTS ordenes (nombre TEXT, documento TEXT, email TEXT, telefono TEXT, direccion TEXT)');

// Middleware para analizar el cuerpo de la solicitud
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta para guardar datos
app.post('/guardar', async (req, res) => {
    try {
        console.log('Recibida una solicitud POST en /guardar:', req.body);

        const { nombre, documento, email, telefono, direccion, direccionEnvio, valorTotal } = req.body;

        // nos aseguramos de ajustar el nombre de la tabla y los campos según el esquema creado
        const query = `
            INSERT INTO ordenes (nombre, documento, email, telefono, direccion, direccionEnvio, valorTotal)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        // Ejecuta la consulta con los datos del formulario
        await db.run(query, [nombre, documento, email, telefono, direccion, direccionEnvio, valorTotal]);

        res.json({ message: 'Datos guardados correctamente' });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});
