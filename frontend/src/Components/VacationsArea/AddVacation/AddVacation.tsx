import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationsModel from "../../../Models/VacationModel";
import notifyService from "../../../Service/NotifyService";
import vacationsService from "../../../Service/VacationsService";
import TextField from "@mui/material/TextField";
import { Button, Stack } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import "./AddVacation.css";

//  Check usage in joiResolver to validate

function AddVacation(): JSX.Element {

    const navigate = useNavigate();

    const { register, handleSubmit, formState } = useForm<VacationsModel>();

    async function send(vacation: VacationsModel) {
        try {
            await vacationsService.addVacation(vacation);
            notifyService.success("Vacation added!")
            navigate("/")
        }
        catch (err: any) {
            notifyService.error(err);
        }
    };


    return (
        <div className="AddVacation">

            <h2>Add Vacation</h2>

            <form onSubmit={handleSubmit(send)} >
                <TextField className="TextField"
                    helperText={formState.errors.destination?.message}
                    color="info" focused
                    
                    label="Destination"
                    defaultValue={" "}
                    {...register("destination", {
                        required: { value: true, message: "Missing destination" },
                        minLength: { value: 5, message: "Destination name is too short" },
                        maxLength: { value: 20, message: "Destination name is too long" },
                    })}
                />

                <br />

                <TextField className="TextField"

                    helperText={formState.errors.destination?.message}
                    color="info" focused
                    label="Description"
                    defaultValue={" "}
                    {...register("description", {
                        required: { value: true, message: "Missing description" },
                        minLength: { value: 5, message: "Description name is too short" },
                        maxLength: { value: 30, message: "Description name is too long" },
                    })}

                />

                <br />

                <label> From Date: </label>
                <input type="date" className="fromDate" {...register("formDate", {
                    required: { value: true, message: "Missing from date" },
                })} />
                <span className="errText">{formState.errors.formDate?.message}</span>

                <br />

                <label> Until Date: </label>
                <input type="date" className="untilDate" {...register("untilDate", {
                    required: { value: true, message: "Missing until date" }
                })} />
                <span className="errText" >{formState.errors.untilDate?.message}</span>

                <br />

                <TextField className="TextField"

                    helperText={formState.errors.price?.message}
                    color="info" focused
                    label="Price"
                    defaultValue={"0"}
                    type="number"
                    {...register("price", {
                        required: { value: true, message: "Missing destination" },
                        min: { value: 0, message: "Price can't be negative" },
                        max: { value: 10000, message: "Price can't exceeds 10000" },
                    })}
                />
                <br />

                <br />

                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}>

                    <Button component="label" variant="outlined">
                        Upload
                        <input accept="image/*" type="file" style={{ visibility: "hidden", display: "none" }} {...register("image")} />
                    </Button>
                        <PhotoCamera color="primary"/>
                </Stack>
                <br/>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                    <Button component="label" variant="contained" onClick={handleSubmit(send)}>
                        Add
                    </Button>

                </Stack>
            </form>
        </div>
    );
}

export default AddVacation;
