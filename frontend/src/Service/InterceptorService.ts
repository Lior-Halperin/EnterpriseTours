import axios from "axios";
import store from "../Redux/Store";
import authService from "./AuthService";

// A function that is activated automatically at each Request or Response

class InterceptorService {

    public createInterceptors(): void {
        // Send token for each request: 
        axios.interceptors.request.use(request => {
            

            if(authService.isLoggedIn()) {
                request.headers = {
                    authorization: "Bearer " + store.getState().authState.token // it is important to put a space in "Bearer "
                };
            }

            return request;

        });

    }

}
const interceptorService = new InterceptorService();

export default interceptorService;

