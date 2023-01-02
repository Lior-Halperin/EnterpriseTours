import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import VacationsModel from "../../../Models/VacationModel";
import store from "../../../Redux/Store";
import notifyService from "../../../Service/NotifyService";
import RoleCapabilities from "../../../Service/RoleCapabilities";
import vacationsService from "../../../Service/VacationsService";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import VacationList from "../../VacationsArea/VacationList/VacationList";
import LayoutLogin from "../LayoutLogin/LayoutLogin";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./Routing.css";

function Routing(): JSX.Element {
    
    const navigate = useNavigate();

    const [vacations, setVacations] = useState<VacationsModel[]>([]);

    // The use of this function is to render the page only and not to use the values:
    useEffect(() => {

        // -----------------29/12/2021---------------
        //   שמתי בהערה כי זה שולח בקשת גט לא לצורך נראה לי אפשר למחוק גם את לעדכן את הסטורג 
        // אולי אפשר למחוק את הטוקן מהלוקל כאשר הקומפוננטה נהרסת 
        // vacationsService.getAllVacations()
        //     .then(vacations => setVacations(vacations))
        //     .catch(err => {
        //         notifyService.error(err)
        //         navigate("/")
        //     })
        // ----------------------------------------------

        // Subscribe for redux changes: 
        const unsubscribe = store.subscribe(() => {
            const dup = [...store.getState().vacationsState.vacations];
            setVacations(dup);
        });

        // Stop listening (socket.io) and unsubscribe:
        return () => { // Invoked once when the component is about to be destroyed
            unsubscribe();
        };
    }, []);

    return (
        <div className="Routing">

            {/* All Routes Collection: */}
            <Routes>

                <Route path="/register" element={<Register />} />

                {/* Login */}
                <Route path="/login" element={<Login />} />

                {/* Logout */}
                <Route path="/logout" element={<Logout />} />

                {/* vacation  */}
                <Route path="/vacations" element={<VacationList />} />

                
                {/* Default */}
                {store.getState().authState.user !== null ? RoleCapabilities().Routes.Default : <Route path="" element={<LayoutLogin />} /> }

                {/* Add new vacation */}
                {store.getState().authState.user !== null ? RoleCapabilities().Routes.AddVacation : "" }

                {/* /:vacationId is a route parameter */}
                {store.getState().authState.user !== null ? RoleCapabilities().Routes.Edit : "" }

                {/* <Route path="/followers-report" element={<FollowersReport/>}/> */}
                {store.getState().authState.user !== null ? RoleCapabilities().Routes.FollowersReport : "" }

                <Route path="*" element={<PageNotFound />} />

            </Routes>
        </div>
    );
}

export default Routing;
