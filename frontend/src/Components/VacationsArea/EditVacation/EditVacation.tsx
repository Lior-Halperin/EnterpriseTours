
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import VacationsModel from "../../../Models/VacationModel";
import notifyService from "../../../Service/NotifyService";
import vacationsService from "../../../Service/VacationsService";
import "./EditVacation.css";
import TextField from "@mui/material/TextField";
import { Button, Stack } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

//  Check usage in joiResolver to validate

function EditVacation(): JSX.Element {

    const params = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, formState, setValue } = useForm<VacationsModel>();
    const [stateVacation, setVacation] = useState<VacationsModel>();

    useEffect(() => {
        const id: number = +params.vacationId;
        vacationsService.getVacationById(id)
            .then(vacationToEdit => {
                setVacation(vacationToEdit);
                setValue("destination", vacationToEdit.destination);
                setValue("description", vacationToEdit.description);
                setValue("formDate", vacationToEdit.formDate);
                setValue("untilDate", vacationToEdit.untilDate);
                setValue("price", vacationToEdit.price);
                setValue("imageName", vacationToEdit.imageName);

            })

            .catch(err => notifyService.error(err.message));
    }, []);


    async function send(vacation: VacationsModel) {
        try {
            vacation.id = stateVacation.id
            await vacationsService.updateVacation(vacation);
            notifyService.success("Vacation updated!")
            navigate("/")
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (

        <div className="EditVacation">


            <h2>Edit Vacation</h2>

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
                <span className="errText">{formState.errors.untilDate?.message}</span>

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
                        Edit
                    </Button>

                </Stack>
            </form>
        </div>
    );
}

export default EditVacation;