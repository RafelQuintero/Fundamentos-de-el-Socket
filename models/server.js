const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.server = require('http').createServer(this.app); //*le estoy mandando mi aplicacion de express que esta en la propiedad this.app
		this.io = require('socket.io')(this.server); //*creamos la propiedad  this.io que hace referncia a la propiedad "io"  para requerir a socket.io_ Ya que esta me da informacion de todas las personas que se encuentran conectados actualmente.

		this.paths = {}; //!lO DEJO DE ESTA FORMA POR SI LO NECESITO MAS ADELANTE

		// Middlewares
		this.middlewares();

		// Rutas de mi aplicación
		this.routes();

		//crearemos un propiedad para hacer un evento que llamaremos socket
		this.sockets(); //Ahora crearemos el enento implemenandolo
	}

	middlewares() {
		// CORS
		this.app.use(cors()); //!LO DEJAMOS POR SI SE  QUIERO HACER PETICIONES Al SERVIDOR

		// Directorio Público
		this.app.use(express.static('public')); //!SE DEJA ESTE MIDDELWARE YA QUE TENGO QUE CREAR UN CLIENTE en la carpeta public. Para chequeo, abrimos el navegador y ejecutamos el localholl:8080 DEBO VER EL TITULO QUE SE ESCRIBIO POR SER ESE UN RECURSO ESTATICO.
	}

	routes() {
		// nO SE NECESTI PERO SE DEJA COMO REFERNCIA PARA RECORDADA COMO SE HIZO
		// this.app.use(this.paths.auth, require('../routes/auth'));
	}

	//evento socket
	sockets() {
		this.io.on('connection', socketController);
	}

	listen() {
		//ESTO SI PORQUE PONMOS AL SEVIDOR A ESCUCHAR PETICIONES*//
		//* donde va app colocare server que hace la misma mismo que app.listen para acccesar al puerto 8080,para  levantar o   para activar el puerto 8080 para que este listo para hacer peticiones. lo probamos recargando la pagina localhost:8080 , si todo sale bien de de aparecer hola mundo, esto sigmifica. que ya estamos corriendo socket.io

		this.server.listen(this.port, () => {
			console.log('Servidor corriendo en puerto', this.port);
		});
	}
}

module.exports = Server;
