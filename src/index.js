const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

// Configurar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar express-session
const sessionConfig = {
  secret: 'mi-secreto', // Cambia esto por una cadena secreta más segura
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionConfig));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });
  

// Simulación de base de datos de usuarios
const users = [
  { id: 1, username: 'usuario1', password: 'password1' }, // contraseña: password1
  { id: 2, username: 'usuario2', password: 'password2' }, // contraseña: password2
];

// Ruta de inicio de sesión
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    const user = users.find((user) => user.username === username);
  
    if (!user || user.password !== password) {
      return res.status(401).send('Credenciales inválidas');
    }
  
    req.session.user = user;
    res.send('Inicio de sesión exitoso');
  });

// Ruta de cierre de sesión
app.post('/logout', (req, res) => {
  req.session.destroy();
  console.log("sesion cerrada")
  res.redirect('/login')

});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
