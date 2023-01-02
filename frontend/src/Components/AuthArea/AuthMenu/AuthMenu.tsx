import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Stack } from '@mui/material';
import store from "../../../Redux/Store";
import "./AuthMenu.css";
import LogoutIcon from '@mui/icons-material/Logout';
import RoleCapabilities from "../../../Service/RoleCapabilities";
import UserModel from "../../../Models/UserModel";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel>();

    useEffect(() => {

        // Load user when component starts: 
        setUser(store.getState().authState.user);

        // Subscribe to changes - when user login/register/logout - reload again the user to the state: 
        const unsubscribe = store.subscribe(() => {
            setUser(store.getState().authState.user);
        });

        // Unsubscribe when component destroyed:
        return () => unsubscribe();

    }, []);

    return (
        <div className="AuthMenu">

            {user && <span> Hello  {user.firstName} {user.lastName} </span>}
            {!user && <span> Hello Guest</span>}

            {user &&

                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}>


                    <NavLink to="/logout">
                        <Button variant="contained" endIcon={<LogoutIcon />} >
                            Logout
                        </Button>
                    </NavLink>
                    
                    {user.role === "Admin" && RoleCapabilities().AuthMenu.buttons.Report}
                    {user.role === "Admin" && RoleCapabilities().AuthMenu.buttons.AddVacation}

                </Stack>

            }
        </div>
    );
}

export default AuthMenu;


