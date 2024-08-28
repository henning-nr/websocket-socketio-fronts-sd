const WebSocket = require("ws");
const http = require("http");
const fs = require("fs");

server = http.createServer(function(req, res){
	file = fs.readFileSync("front-webskt.html");
	res.end(file)
})

const wss = new WebSocket.Server({ server });
wss.on("connection", (ws) => {
	ws.on("message", (message) => {
		console.log("received: ", message);
		wss.clients.forEach((client) => {
			client.send(message);
		});
	});
});

server.listen(3000,()=>{
	console.log('Chat rodando na porta 3000')
})

async function verifyType(message, client) {
	if (message.includes("dog")) {
		const buffer = Buffer.from("dog run", 'utf-8');
		await client.send(buffer);
	} else {
		await client.send(message);
	}
}
