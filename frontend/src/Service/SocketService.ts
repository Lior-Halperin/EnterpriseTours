import {io, Socket} from "socket.io-client";
import VacationsModel from "../Models/VacationModel";
import store from "../Redux/Store";
import { addVacationAction, deleteVacationAction, updateVacationAction } from "../Redux/VacationState";


class SocketService {

    private socket: Socket;

    public connect(): void {
        this.socket = io("http://localhost:3002");
        this.listen();

    }

    private listen(): void {

        // Listen to adding by admin: 
        this.socket.on("admin-added-vacation", (vacation: VacationsModel) => {
            store.dispatch(addVacationAction(vacation));
        });

        // Listen to updating by admin: 
        this.socket.on("admin-updated-vacation", (vacation: VacationsModel) => {
            store.dispatch(updateVacationAction(vacation));
        });
        
        // Listen to deleting by admin: 
        this.socket.on("admin-deleted-vacation", (id: number) => {
            store.dispatch(deleteVacationAction(id));
        });
    }

    public disconnect(): void {
        this.socket.disconnect();
    }

}

const socketService = new SocketService;

export default socketService
