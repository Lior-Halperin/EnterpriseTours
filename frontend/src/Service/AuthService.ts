import axios from "axios";
import jwtDecode from "jwt-decode";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import { loginAction, logoutAction, registerAction } from "../Redux/AuthState";
import store from "../Redux/Store";
import config from "../Utils/Config";

class AuthService {

    public async register(user: UserModel): Promise<void>{
        const response = await axios.post<string>(config.registerUrl, user);
        const token = response.data;
        store.dispatch(registerAction(token));
    }

    public async login(Credentials: CredentialsModel ): Promise<void>{
        const response = await axios.post<string>(config.loginUrl, Credentials);
        const token = response.data;
        store.dispatch(loginAction(token));
    }

    public logout(): void {
        store.dispatch(logoutAction());
    }

    public isLoggedIn(): boolean {
        return store.getState().authState.user !== null;
    }

    public userDetails(): any {
        const token = localStorage.getItem("token")
        const userDetails = (jwtDecode(token) as any).user
        return userDetails
    }
        
}

const authService = new AuthService();

export default authService;


