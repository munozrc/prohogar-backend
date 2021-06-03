import { Server, Socket } from "socket.io";
import http from "http";

enum Events {
  CONNECTION = "connection",
  DISCONNECT_USER = "disconnectUser",
}

export default class SocketServer {
  public static readonly PORT: number = 7000;
  private server: http.Server;
  private io: Server;

  constructor(server: http.Server) {
    this.server = server;
    this.io = new Server(this.server);
  }

  public run(): void {
    this.io.on(Events.CONNECTION, (socket: Socket) => {
      console.log("[*] Socket: Init");
    });
  }
}
