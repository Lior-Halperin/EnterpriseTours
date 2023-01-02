import { Button } from "@mui/material";
import AssessmentIcon from '@mui/icons-material/Assessment';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { NavLink, Route } from "react-router-dom";
import AddVacation from "../Components/VacationsArea/AddVacation/AddVacation";
import EditVacation from "../Components/VacationsArea/EditVacation/EditVacation";
import FollowersReport from "../Components/VacationsArea/FollowersReport/FollowersReport";
import VacationList from "../Components/VacationsArea/VacationList/VacationList";
import store from "../Redux/Store";


function RoleCapabilities() {

    const role = store.getState().authState.user.role;

    
    let RoleCapabilities;

    switch (role) {
        case "User":
            RoleCapabilities = {
                Routes: {
                    Default: <Route path="" element={<VacationList />} />,
                },

            }
            break;

        case "Admin":
            RoleCapabilities = {

                Routes: {
                    Default: <Route path="" element={<VacationList />} />,
                    AddVacation: <Route path="/vacations/new" element={<AddVacation />} />,
                    Edit: <Route path="/vacations/edit/:vacationId" element={<EditVacation />} />,
                    FollowersReport: <Route path="/followers-report" element={<FollowersReport />} />,
                },
                AuthMenu: {
                    buttons: {
                        Report:
                            <NavLink to="/followers-report">
                                <Button variant="contained" endIcon={<AssessmentIcon />}>
                                    Report
                                </Button>
                            </NavLink>
                        ,
                        AddVacation:
                            <NavLink to="/vacations/new">
                                <Button variant="contained" endIcon={<AddLocationAltIcon />}>
                                    Add Vacation
                                </Button>
                            </NavLink>
                        ,
                    },
                },

            }
            break;
    }

    return RoleCapabilities
}


export default RoleCapabilities;
