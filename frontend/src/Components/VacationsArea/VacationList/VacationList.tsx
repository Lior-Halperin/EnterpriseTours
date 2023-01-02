import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VacationsModel from "../../../Models/VacationModel";
import store from "../../../Redux/Store";
import notifyService from "../../../Service/NotifyService";
import socketService from "../../../Service/SocketService";
import vacationsService from "../../../Service/VacationsService";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationList.css";

function VacationList(): JSX.Element {

    const navigate = useNavigate();

    // state to handle vacations:
    const [vacations, setVacations] = useState<VacationsModel[]>([]);

    // Get vacations from backend once:
    useEffect(() => {
        // Connect to socket.io:
        socketService.connect();

        vacationsService.getAllVacations()
            .then(vacations => setVacations(vacations))
            .catch(err => {
                notifyService.error(err)
                navigate("/")
            })

        // Subscribe for redux changes: 
        const unsubscribe = store.subscribe(() => {
            const dup = [...store.getState().vacationsState.vacations];
            setVacations(dup);
        });

        // Stop listening (socket.io) and unsubscribe:
        return () => {
            socketService.disconnect()
            unsubscribe();
        };
    }, []);

    return (
        <div className="VacationList">

            {vacations.map(v => <VacationCard key={v.id} vacation={v} />)}

        </div>
    );
}

export default VacationList;
