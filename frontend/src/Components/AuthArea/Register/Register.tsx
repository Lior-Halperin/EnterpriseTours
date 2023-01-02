import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Service/AuthService";
import TextField from "@mui/material/TextField";
import { Button, Stack } from "@mui/material";
import "./Register.css";
import notifyService from "../../../Service/NotifyService";

function Register(): JSX.Element {

    const navigate = useNavigate();

    const { register, handleSubmit, formState } = useForm<UserModel>();

    async function send(user: UserModel) {
        try {
            await authService.register(user);
            navigate("/")
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }
    return (


        <div className="Register">

            <form onSubmit={handleSubmit(send)} >

            <h2> Register</h2>

                <TextField className="TextField"

                    helperText={formState.errors.firstName?.message}
                    color="info" focused
                    label="First name"
                    defaultValue={""}
                    {...register("firstName", {
                        required: { value: true, message: "Missing firstName" },
                        minLength: { value: 2, message: "firstName is too short" },
                        maxLength: { value: 25, message: "firstName is too long" },
                    })}
                />

                <br />

                <TextField className="TextField"

                    helperText={formState.errors.lastName?.message}
                    color="info" focused
                    label="Last name"
                    defaultValue={""}
                    {...register("lastName", {
                        required: { value: true, message: "Missing lastName" },
                        minLength: { value: 2, message: "lastName is too short" },
                        maxLength: { value: 25, message: "lastName is too long" },
                    })}

                />

                <br />

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
                        minLength: { value: 4, message: "password is too short" },
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
                        Send
                    </Button>

                </Stack>
                </form>
        </div>
    );
}

export default Register;
