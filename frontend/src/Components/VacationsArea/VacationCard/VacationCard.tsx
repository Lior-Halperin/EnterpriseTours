import { Badge } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import VacationsModel from "../../../Models/VacationModel";
import "./VacationCard.css";
import followersService from "../../../Service/FollowersService";
import { useEffect, useState } from "react";
import store from '../../../Redux/Store';
import config from "../../../Utils/Config";
import EditOutlinedIcon from '@mui/icons-material//EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import vacationsService from "../../../Service/VacationsService";
import notifyService from "../../../Service/NotifyService";
import { NavLink } from "react-router-dom";

interface vacationCardProps {
    vacation: VacationsModel;
}

function VacationCard(props: vacationCardProps): JSX.Element {

    const [colorButton, setColorButton] = useState<string>("");
    const [capabilities, setCapabilities] = useState<any>({});
    const [followNumber, setFollowNumber] = useState<number>();

    const vacationId = props.vacation.id;
    const destination = props.vacation.destination

    const userModel = store.getState().authState.user;
    const role =  `${userModel && userModel.role}` 


    useEffect(() => {

        orderCards()

        followersService.followNumber(vacationId)
            .then(followNumber => setFollowNumber(followNumber))

        followersService.followStatus(vacationId)
            .then(followStatus => followStatus ? setColorButton("Gold") : setColorButton("GhostWhite"))

        switch (role) {
            case "User":
                setCapabilities(typeOfCapabilities.user)

                break;
            case "Admin":
                setCapabilities(typeOfCapabilities.admin)
                break;
        }

    },[]);


    function sendFollower() {
        if (colorButton === "Gold") {
            followersService.deleteFollow(vacationId)
            setColorButton("GhostWhite")
        }
        else {
            followersService.addFollow(vacationId)
            setColorButton("Gold")
        }
    }
    function orderCards() {
      return  colorButton === "Gold" ?  0 :  1
    }

    async function deleteCard() {
        try{
            await vacationsService.deleteVacation(vacationId)
               notifyService.success("The vacation in " + destination + " is deleted" )
       }
       catch(err: any){
           notifyService.error(err);
       }
    }

    const typeOfCapabilities = {

        user: {
            followButton: false,
        },

        admin: {
            followButton: true,
            editButton:
                    <NavLink to={"/vacations/edit/" + vacationId}>
                    <EditOutlinedIcon style={{ color: "GhostWhite" }} />
                    </NavLink>,
            deleteButton:
                <button onClick={() => deleteCard()}>
                    <DeleteOutlinedIcon style={{ color: "GhostWhite" }} />
                </button>,
        }
    };


    return (
        <div className="VacationCard" style={{ order: orderCards() }}>
            <div className="flip-card">
                <div className="flip-card-inner" >
                    <div className="flip-card-front" style={{ backgroundImage: `url(${config.vacationImagesUrl + props.vacation.imageName})` }}>

                        <h2>{props.vacation.destination}</h2>
                    </div>
                    <div className="flip-card-back">
                        <img src={config.vacationImagesUrl + props.vacation.imageName} />
                        <div className="meinDetails">
                            <h1>{props.vacation.destination}</h1>
                            <p>{props.vacation.description}</p>
                            <p>price: ${props.vacation.price}</p>
                            <p>{props.vacation.formDate} - {props.vacation.untilDate}</p>
                        </div>
                        <div className="buttonPanel">
                            <button className="followButton" onClick={() => sendFollower()} disabled={capabilities.followButton} >
                                <Badge style={{ color: colorButton }} aria-label="add to favorites" badgeContent={followNumber}  >
                                    <FavoriteIcon />
                                </Badge>
                            </button>

                            {/* Edit button only for Admin */}
                            {capabilities.editButton}

                            {/* Delete button only for Admin */}
                            {capabilities.deleteButton}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VacationCard;
