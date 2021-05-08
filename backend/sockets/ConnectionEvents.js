module.exports = function (io) {
    io.on('connection', socket => {
        socket.on('enter_room', (req) => {
            socket.join(req.roomID);
            console.log("A user joined", req.roomID);
            let message = "A user joined"
            emitMessageToSocketRoom(io, socket, message)
        });

        socket.on('message', (req) => {
            let message = `${req.username}: ${req.message}`
            emitMessageToSocketRoom(io, socket, message)
        });


        socket.on('leave_room', (req) => {
            console.log("A user left", req.roomID);
            let message = "A user left"
            emitMessageToSocketRoom(io, socket, message)
            socket.leave(req.roomID);
        });


        socket.on('disconnecting', (req) => {
            let message = "A user left"
            emitMessageToSocketRoom(io, socket, message)
        });
    });
}

function emitMessageToSocketRoom(io, socket, message) {
    // Remove room if it is the socket id itself
    let rooms = Array.from(socket.rooms).filter(function (item) {
        return item !== socket.id;
    });
    console.log("message sent to", rooms[0])
    if (rooms && rooms.length) {
        io.in(rooms[0]).emit('message_update', message);
    }
}