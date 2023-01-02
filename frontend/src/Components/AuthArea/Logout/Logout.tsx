import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../Service/AuthService";
import notifyService from "../../../Service/NotifyService";

function Logout(): JSX.Element {

    const navigate = useNavigate();

    useEffect(() => {

        const logout = () => {
            try {
                authService.logout();
                notifyService.success("You have been successfully logged-out")
                navigate("/")
            }
            catch (err: any) {
                notifyService.error(err.massage)
            }
        }
        return logout
    }, [])

    return null; // No need HTML.

}

export default Logout;
