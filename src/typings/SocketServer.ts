import { Server, Socket } from "socket.io";
import http from "http";

enum Events {
  CONNECTION = "connection",
  USER_CONNECT = "userConnect",
  USER_DISCONNECT = "userDisconnect",
  GET_USERS_CONNECT = "getUsersConnected",
  SET_SERVICES = "setServices",
  NEW_SERVICES = "newServices",
}

let users: Array<string> = [];

export default class SocketServer {
  public static readonly PORT: number = 7000;
  private server: http.Server;
  private io: Server;

  constructor(server: http.Server) {
    this.server = server;
    this.io = new Server(this.server, {
      cors: { credentials: true, origin: true },
    });
  }

  public run(): void {
    this.io.on(Events.CONNECTION, (socket: Socket) => {
      console.log("[*] Server: new user");

      socket.on(Events.USER_CONNECT, (id: string) => {
        console.log("[*] Socket: user<" + id + "> is connected");
        if (!users.find((current) => current === id)) users.push(id);
        socket.emit(Events.GET_USERS_CONNECT, users);
        socket.broadcast.emit(Events.GET_USERS_CONNECT, users);
      });

      socket.on(Events.USER_DISCONNECT, (id: string) => {
        console.log("[*] Socket: user<" + id + "> is disconnect");
        users = users.filter((current) => current !== id);
        socket.broadcast.emit(Events.GET_USERS_CONNECT, users);
      });
    });
  }
}
