require('dotenv').config();
const Server = require('./models/server');

//! Creamos una instacio de servidor
const server = new Server();

//ahora solicitemos  para que el servidor este liste para cualquier solicitud
server.listen();
