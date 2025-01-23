require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');

const path = require('path');

const app = express();


app.use(express.static(path.join(__dirname, 'public')));
const port = process.env.PORT || 80;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Rutas para el formulario y guardar respuesta
app.get('/formulario', (req, res) => {
  const respuesta = req.cookies.respuesta;
  
  res.render('formulario', { respuesta : respuesta });
});

app.post('/guardar', (req, res) => {
  const respuesta = req.body.respuesta;

  res.cookie('respuesta', respuesta);
  
  res.send('Respuesta guardada correctamente');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
