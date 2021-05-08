module.exports = function (io) {
    io.on('connection', socket => {
        socket.on('enter_room', (req) => {
            socket.join(req.roomID);
            console.log("A user joined", req.roomID);
        });

        socket.on('leave_room', (req) => {
            socket.leave(req.roomID);
            console.log("A user left", req.roomID);
        });

        socket.on('message', (req) => {
            io.in(req.roomID).emit('message_update', `${req.username}: ${req.message}`);
        });
    });
}