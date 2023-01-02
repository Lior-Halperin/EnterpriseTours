import { Server as HttpServer } from "http";
import { Server as SocketServer, Socket } from "socket.io";
import VacationsModel from "../4-models/vacation-model";

let socketServer:SocketServer;

function init(httpServer: HttpServer): void {

   // Create a socket server object: 
    socketServer = new SocketServer(httpServer, { cors: { origin: "*" } });

       // Listen to clients connection: 
       socketServer.sockets.on("connection", (socket: Socket) => {
        console.log("Client has been connected...");
    });

}

function reportAddVacation(vacation: VacationsModel):void {
    socketServer.sockets.emit("admin-added-vacation", vacation)
}

function reportUpdateVacation(vacation: VacationsModel):void {
    socketServer.sockets.emit("admin-updated-vacation", vacation)
}

function reportDeleteVacation(id: number):void {
    socketServer.sockets.emit("admin-deleted-vacation", id)
}

export default {
    init,
    reportAddVacation,
    reportUpdateVacation,
    reportDeleteVacation
};