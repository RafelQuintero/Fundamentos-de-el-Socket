//! Aqui se trendran todas la referncia html
console.log('Hola mundo');
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline'); //ahpra crearems el evnto del botton

const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');

//* Aqui tendremos todo las instrucciones para  la comunicacion de mi wed-spcket con el servidor. Para eso debemos instalr la libreria llamda socket.io.
//Pero antes  en el archivo index.js edebe incluirse la instruccion: <script src="./js/socket-client.js  "></sc  una importaciomn del archivo socke-client.js ript>
//*ahore debemos decirle que se conecte el cliente ya que cuamdp se ejecuta  el eventos this.socket pe esta pidiendo perviamente que el cilente se conecte. y esto se hace con la instruccion de abajo.

const socket = io();

socket.on('connect', () => {
	console.log('Conectado al servidor');
	//*Cuando se conecta que el lboffline no se vea
	lblOffline.style.display = 'none'; //Cuando el cliente esta comectado que  no se muestre solo  Offline
	lblOnline.style.display = ''; //Cuando el cliente esta comectado que se muestre solo  Online
});
socket.on('disconnect', () => {
	console.log('Desconectado del servidor');
	//Ahora haremos el proceso invero cuando me deconecto
	lblOnline.style.display = 'none'; //Cuando el cliente no  esta comectado que no  se muestre solo  Online
	lblOffline.style.display = ''; //Cuando el cliente emp esta  comectado que   se muestre solo  Offline
});

//Ahora coloremos al cliente a escuchar mensaje enviado por otro cliente(socket) con la siguinete  código

socket.on('enviar-mensaje', (payload) => {
	console.log(payload); //Para ver que funciona bien.
});

//? Ahor debo hacer que el cliente que envio el mensaje no lo reciba el mismo , par que si ese cliente sabe lo que mandó.

//Creando el evento del botton que es hacer click y mostrara lo que está escrito en la caja de texo para que envie el texto que se escribio al servidor.
btnEnviar.addEventListener('click', () => {
	const mensaje = txtMensaje.value;
	//? Se quiere mandar son objeto y no una edicion plana por lo crearemos un objeto que llamaremos payload que contendra un objeto que contendra el mensaje , un id, la fecha en el dia que se mando y cualquiera otra cosas que se quiera mandar.

	const payload = {
		mensaje,
		id: '123ABCD',
		fecha: new Date().getTime(),
	};
	//debemos mandarle la informacion al servidor, utilizando el socket.emit() el .emit es para emitir un evento. qUE LO CONTIENE LA LIBRERIA SOCKET.IO
	// Se recominda no usar mayuscula, ni camelquei, ni espacion en el nobre del evento que vamos a utilizar o mandar.
	//El payload es lo que contienela caja txtbox es decir su value (VALOR).
	socket.emit('enviar-mensaje', payload, (id) => {
		console.log('Desde el servidor', id);
	});

	//Con la siguiente istruccion se escuhara en el lado del servidor y debemos hacerlo en el serviodr en la uncion socket()
});
