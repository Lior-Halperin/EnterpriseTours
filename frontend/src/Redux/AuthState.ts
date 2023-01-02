import jwtDecode from "jwt-decode"; // Allows decoding of the token
import UserModel from "../Models/UserModel";


// 1. Vacations State - The global state relate to vacations
export class AuthState {

    public token: string = null;
    public user: UserModel = null;

    // When the user creates a new object a constructor is executed and go to the localStorage and load the token
    public constructor() {
        this.token = localStorage.getItem("token")
        if (this.token) {
            this.user = (jwtDecode(this.token) as any).user;
        }
    }
}

// 2. Action Type
export enum AuthActionType {
    Register = "Register",
    Login = "Login",
    Logout = "Logout"
}

// 3. Action
export interface AuthAction {
    type: AuthActionType;
    payload?: string;
}

// 4. Action Creators
export function registerAction(token: string): AuthAction {
    const action: AuthAction = { type: AuthActionType.Register, payload: token };
    return action
}

export function loginAction(token: string): AuthAction {
    const action: AuthAction = { type: AuthActionType.Login, payload: token };
    return action
}

export function logoutAction(): AuthAction {
    const action: AuthAction = { type: AuthActionType.Logout };
    return action
}

// 5. Reducer
export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {

    const newState = { ...currentState };


    switch (action.type) {
        case AuthActionType.Register:
        case AuthActionType.Login:
            const token = action.payload; // Get token form the backend
            newState.token = token; // Converts the current token to the new token we received from backend.
            newState.user = (jwtDecode(token) as any).user // Deciphering the token we received, and converting the current user to the user sitting inside the token we received. 
            localStorage.setItem("token", token) // Save token in storage!
            break;
        case AuthActionType.Logout:
            newState.token = null;
            newState.user = null;
            localStorage.removeItem("token"); // Clear token from storage.
            break;
    }

    return newState
}
