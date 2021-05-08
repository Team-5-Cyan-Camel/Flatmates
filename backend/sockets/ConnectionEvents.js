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
            // Remove room if it is the socket id itself
            let rooms = Array.from(socket.rooms).filter(function(item) {
                return item !== socket.id;
            });
            console.log("message sent to",rooms)
            if (rooms && rooms.length) {
                io.in(rooms[0]).emit('message_update', `${req.username}: ${req.message}`);
            }
        });
    });
}