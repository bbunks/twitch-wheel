import { Server } from "http";
import { Server as SocketServer } from "socket.io";

export let SocketIO: SocketServer;

export function initSocket(server: Server) {
  SocketIO = new SocketServer(server, {});
}
