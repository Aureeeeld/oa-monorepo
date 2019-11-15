import socketio, { Server } from "socket.io";

let io: Server;

export const initSocket = (server: any): void => {
  io = socketio(server);
};

export const getSocket = (): Server => io;
