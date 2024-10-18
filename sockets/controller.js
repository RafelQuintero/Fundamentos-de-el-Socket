//* Aqui se cclocaran todos los eventos del socket.io para que mantener limpi el server.js que es el que hacer  la funcionbilidad dl servidor

const socketController = (socket) => {
	// Quitemos esto que ya abemos que funcione, para no teer tanto span
	// console.log('Cliente comectado', socket.id); // colocquemos el identificador unico que crea el socket.io

	//Para que me diga que esta conectado y lo muestre en el terminal y me muestre el id
	console.log('Cliente conectado', socket.id);

	//* io me desconecta la cliente que llamamos socket y lo hac con la siguiente instruccion.
	socket.on('disconnect', () => {
		console.log('Clente desconecatdo', socket.id);
	});

	//*La instruccion de abajo es para que el servidor reciba o escuche, lo que le manda el cliente(que lo hemos llamamos:"socket") desde el froned. para que lo registre
	socket.on('enviar-mensaje', (payload, callback) => {
		//?Para recibir la informacion de un cliente (socket)en el servido y luego madarsel a otro cliente. Utilizo  la referencia de la propiedad io para que emita un evento(mande la informacion a todos lo cliente conectados por ejemplo ña informacion del objeto payoad que contiene el mesage, el id. la fecha  y cuaquiera otra cosa que se quera mandar.

		//* this.io.emit('enviar-mensaje', payload);// Suprimo la informacion porque yo se que esto funciona

		//* el callback  debe ser ejeuctodo cuando todo termino y le manda la referncia del id  que esta reflejado en socket emit.

		const id = 10573389;
		callback(id); //*Aqui (line 24) puedo hacer que un clinte o varios clientes reciban  desde el servido,  informacion por medio  de un objeto, pero que estos que sean literales o primitivos.
		//? La informacion que recibira el cliente1 que envio la informacion recibira el id por medio del callback.

		//? Emitimos la imformacion al servidor; pero no lo está recibiendo el (los) otro(s) clientes(socket) por lo que debemos escibir el codigo en el archivo socket.client.js

		//com ya se que esto funciona lo elimino con un comentarito
		// console.log(payload);

		socket.broadcast.emit('enviar-mensaje', payload); //** emitire un mesaje utilizando los sockt ya que no puedo de: this.io.emit('enviar.mensaje', payload) no puedo utilizar el this.io que hace referncia a al propiedad io pero esta esta en el servido. Por lo que haré  por medio del socket qu tambien tine esta propiedad y para que se lo mande a todos los clientes agrego la instruccio broadcast */
	});
};

module.exports = {
	socketController,
};
