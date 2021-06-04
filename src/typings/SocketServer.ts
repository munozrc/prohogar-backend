import { Server, Socket } from "socket.io";
import http from "http";

enum Events {
  CONNECTION = "connection",
  CONNECT_USER = "connectUser",
  DISCONNECT_USER = "disconnectUser",
  SET_SERVICES = "setServices",
  NEW_SERVICES = "newServices",
}

let usersCurrent: Array<string> = [];

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
      const user = socket.handshake.auth.id;
      console.log("[*] Socket: user<" + user + ">");
      if (!usersCurrent.find((current) => current === user))
        usersCurrent.push(user);

      socket.broadcast.emit(Events.CONNECT_USER, {
        users: usersCurrent,
      });

      socket.on(Events.DISCONNECT_USER, (id: string) => {
        console.log("[*] Socket: user-disconnect<" + id + ">");
        usersCurrent = usersCurrent.filter((current) => current !== id);
        socket.broadcast.emit(Events.DISCONNECT_USER, {
          users: usersCurrent,
        });
      });
    });
  }
}
