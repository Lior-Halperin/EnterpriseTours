import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Service/AuthService";
import notifyService from "../../../Service/NotifyService";
import TextField from "@mui/material/TextField";
import { Button, Stack } from "@mui/material";
import "./Login.css";

function Login(): JSX.Element {

    let navigate = useNavigate();

    const { register, handleSubmit, formState } = useForm<CredentialsModel>();

    async function send(Credentials: CredentialsModel) {
        try {
            await authService.login(Credentials)
            notifyService.success("You have been successfully logged-in.")
            navigate("/vacations")
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Login">

            <form onSubmit={handleSubmit(send)} >
                <h2> Login</h2>

                <TextField className="TextField"

                    helperText={formState.errors.username?.message}
                    color="info" focused
                    label="Username"
                    defaultValue={""}
                    {...register("username", {
                        required: { value: true, message: "Missing username" },
                        minLength: { value: 2, message: "username is too short" },
                        maxLength: { value: 25, message: "username is too long" },
                    })}

                />

                <br />

                <TextField className="TextField"

                    helperText={formState.errors.password?.message}
                    color="info" focused
                    label="Password"
                    type="password"
                    defaultValue={""}
                    {...register("password", {
                        required: { value: true, message: "Missing password" },
                        minLength: { value: 0, message: "password is too short" },
                        maxLength: { value: 15, message: "password is too long" },
                    })}

                />

                <br />

                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}>

                </Stack>
                <br />
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                    <Button component="label" variant="contained" onClick={handleSubmit(send)}>
                        Login
                    </Button>

                </Stack>
            </form>

        </div>
    );
}

export default Login;
