import { Server, Socket } from "socket.io";
import http from "http";

enum Events {
  CONNECTION = "connection",
  USER_CONNECT = "userConnect",
  USER_DISCONNECT = "userDisconnect",
  GET_USERS_ONLINE = "getUsersOnline",
  NEW_USERS_ONLINE = "newUserOnline",
  NEW_SERVICES_BY_CLIENT = "newServiceByClient",
  ANSWER_REQUEST = "answerRequest",
  CONTRACT_PRO = "contractProfessional",
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
        socket.broadcast.emit(Events.NEW_USERS_ONLINE, users);
      });

      socket.on(Events.GET_USERS_ONLINE, () => {
        console.log("[*] user request all users");
        socket.emit(Events.GET_USERS_ONLINE, users);
      });

      socket.on(Events.NEW_SERVICES_BY_CLIENT, (listUsersPro) => {
        socket.broadcast.emit(Events.NEW_SERVICES_BY_CLIENT, listUsersPro);
      });

      socket.on(Events.ANSWER_REQUEST, (service) => {
        socket.broadcast.emit(Events.ANSWER_REQUEST, service);
      });

      socket.on(Events.CONTRACT_PRO, (service) => {
        socket.broadcast.emit(Events.CONTRACT_PRO, service);
      });

      socket.on(Events.USER_DISCONNECT, (id: string) => {
        console.log("[*] Socket: user<" + id + "> is disconnect");
        users = users.filter((current) => current !== id);
        socket.broadcast.emit(Events.GET_USERS_ONLINE, users);
      });
    });
  }
}
