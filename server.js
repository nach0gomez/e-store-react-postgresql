const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el paquete 'cors'

const app = express();
const port = 3004;


app.use(cors()); // Permite todas las solicitudes desde cualquier origen

// Configuración de CORS con orígenes específicos permitidos
const allowedOrigins = ['http://localhost:3000']; // dominio frontend 
app.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
}));

// Configuración de SQLite y creación de la tabla con nombre ecommerce
const db = new sqlite3.Database('ecommerce.sqlite');
db.run('CREATE TABLE IF NOT EXISTS ordenes (nombre TEXT, documento TEXT, email TEXT, telefono TEXT, direccion TEXT)');

// Middleware para analizar el cuerpo de la solicitud
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta para guardar datos
app.post('/guardar', (req, res) => {
    console.log('Recibida una solicitud POST en /guardar:', req.body);

    try {
    const { nombre, documento, email, telefono, direccion } = req.body;

    db.run('INSERT INTO ordenes (nombre, documento, email, telefono, direccion) VALUES (?, ?, ?, ?, ?)',
        [nombre, documento, email, telefono, direccion],
        (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Datos guardados correctamente' });
        });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});
