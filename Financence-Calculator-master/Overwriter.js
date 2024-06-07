
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({ limit: '20mb' }));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.post('/api/OverwriteEstado', (req, res) => {
  const jsonData = req.body; 
  const filePath = 'src/views/admin/estado/variables/tableDataEstado.json'; // Ruta al archivo JSON existente

  fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Error al sobrescribir el archivo:', err);
      res.status(500).json({ error: 'Error al sobrescribir el archivo' });
    } else {
      console.log('Archivo JSON sobrescrito con éxito.');
      res.status(200).json({ message: 'Archivo JSON sobrescrito con éxito' });
    }
  });
});

app.post('/api/OverwritePasivos', (req, res) => {
  const jsonData = req.body; 
  const filePath = 'src/views/admin/balance/variables/tableDataPasivos.json'; // Ruta al archivo JSON existente

  fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Error al sobrescribir el archivo:', err);
      res.status(500).json({ error: 'Error al sobrescribir el archivo' });
    } else {
      console.log('Archivo JSON sobrescrito con éxito.');
      res.status(200).json({ message: 'Archivo JSON sobrescrito con éxito' });
    }
  });
});
app.post('/api/OverwriteActivos', (req, res) => {
  const jsonData = req.body; 
  const filePath = 'src/views/admin/balance/variables/tableDataDevelopment.json'; // Ruta al archivo JSON existente

  fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Error al sobrescribir el archivo:', err);
      res.status(500).json({ error: 'Error al sobrescribir el archivo' });
    } else {
      console.log('Archivo JSON sobrescrito con éxito.');
      res.status(200).json({ message: 'Archivo JSON sobrescrito con éxito' });
    }
  });
});

app.post('/api/CrearJson', (req, res) => {
  const tableData = req.body;

  tableData.forEach((table) => {
    const { sheetName, data } = table;

    // Convertir los datos a formato JSON

    // Definir la ruta completa para el archivo JSON
    const filePath = path.join(__dirname, 'src', 'variables', `${sheetName}.json`);

    // Escribir los datos en un archivo JSON separado para cada hoja
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error(`Error al escribir en el archivo ${filePath}:`, err);
      } else {
        console.log(`Archivo ${filePath} creado correctamente.`);
      }
    });
  });

  res.json({ message: 'Archivos JSON creados correctamente.' });
});


app.listen(3001, () => {
  console.log('Servidor Node.js en ejecución en el puerto 3001');
});