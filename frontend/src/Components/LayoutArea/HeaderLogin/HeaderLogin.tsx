import { NavLink } from "react-router-dom";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./HeaderLogin.css";

function HeaderLogin(): JSX.Element {


    return (
        <div className="HeaderLogin">

            <NavLink to="/">
                <h1>Enterprise Tour</h1>
            </NavLink>

            <AuthMenu />

        </div>
    );
}

export default HeaderLogin;
