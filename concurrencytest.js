const net = require('net');

let connectionCount = 0;

const server = net.createServer((socket) => {
    connectionCount++;
    const clientId = connectionCount;
    console.log(`[${clientId}] Client connected. Total clients: ${connectionCount}`);

    socket.setTimeout(30000);

    socket.on('data', (data) => {
        console.log(`[${clientId}] Received: ${data.toString().trim()}`);
        socket.write(`Server Echo: ${data}`);
    });

    socket.on('close', () => {
        connectionCount--;
        console.log(`[${clientId}] Client disconnected. Total clients: ${connectionCount}`);
    });

    socket.on('error', (err) => {
        console.error(`[${clientId}] Socket Error: ${err.message}`);
    });

    socket.on('timeout', () => {
        console.log(`[${clientId}] Socket timed out due to inactivity.`);
        socket.end('Timed out.');
    });
});

const PORT = 8000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`TCP server listening on port ${PORT}. Ready for connections.`);
});

process.on('SIGINT', () => {
    console.log('Shutting down server.');
    server.close(() => {
        process.exit(0);
    });
});