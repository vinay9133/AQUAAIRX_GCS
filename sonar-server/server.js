const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());

const generateSonarData = () => {
    return {
      timestamp: new Date().toISOString(),
      pulses: Array.from({ length: 10 }, () => ({
        distance: Math.random() * 100,
        angle: Math.random() * 360,
        intensity: Math.random() * 100
      }))
    };
  };
  

io.on('connection', (socket) => {
  console.log('Client connected');

  const sendData = setInterval(() => {
    const data = generateSonarData();
    socket.emit('sonarData', data);
  }, 1000); 

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(sendData);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
