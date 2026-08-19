const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const multer = require('multer');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const upload = multer({ dest: 'uploads/' });

app.use(express.static(__dirname));
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Gp01.html'));
});

app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ path: req.file.path });
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => io.emit('chat message', msg));
});

server.listen(3000, () => console.log('Server running on 3000'));
