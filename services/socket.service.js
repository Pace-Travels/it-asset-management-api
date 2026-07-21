import { Server } from "socket.io";

let io = null;

export const init = (server) => {

    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE"]
        }
    });

    io.on("connection", (socket) => {
        console.log(`Socket Connected : ${socket.id}`);
        socket.on("register_screen", (screenId) => {
            socket.join(`screen_${screenId}`);
        });

        socket.on("disconnect", () => {
            console.log(`Socket Disconnected : ${socket.id}`);
        });

    });

};

export const notifyScreen = (screenId, action, data = {}) => {

    if (!io) return;
    io.to(`screen_${screenId}`).emit("command", {
        action,
        data
    });

};

export const notifyAll = (event, data = {}) => {

    if (!io) return;
    io.emit(event, data);

};

export const getIO = () => {

    if (!io) {
        throw new Error("Socket not initialized.");
    }
    return io;

};