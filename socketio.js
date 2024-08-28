const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();

const server = http.createServer(app);
const io = socketIo(server);

/*
const io = socketIo(server, {
	cors: {
		origin: "https://f1507f58-b4dd-456d-b606-774816ea34b2-00-xx79cbgimapc.worf.replit.dev",
		methods: ["GET", "POST"]
	},
	transport: 'websocket' // Definir para usar apenas WebSockets
});
*/

// Configuração das rotas do servidor (se houver outras)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
		console.log('Um usuário conectado');

		socket.on('message', (msg) => {
				console.log('Mensagem recebida: ' + msg);
				io.emit('message', msg);
		});
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
		console.log(`Servidor rodando na porta ${PORT}`);
});
