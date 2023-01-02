import { useEffect, useState } from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";
import "./AuthSelector.css";
import { Button, Stack } from "@mui/material";

function AuthSelector(): JSX.Element {

    const [authSelected, setAuthSelected] = useState<any>();
    const [typeAuthButton, setTypeAuthButton] = useState<string>();

    useEffect(() => {
        setAuthSelected(<Login />)
        setTypeAuthButton("Register")
    }, [])

    function currentAuth() {

        if (typeAuthButton === "Register") {

            setAuthSelected(<Register />)
            setTypeAuthButton("Login")
        }
        else {
            setAuthSelected(<Login />)
            setTypeAuthButton("Register")
        }
    }

    return (
        <div className="AuthSelector">
            {authSelected}
            
            <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}>

                </Stack>
                <br />
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                    <Button component="label" variant="outlined" onClick={() => currentAuth()}>
                    {typeAuthButton}
                    </Button>

                </Stack>
        </div>
    );
}

export default AuthSelector;
