import express, { NextFunction, Request, Response } from "express";
import CredentialsModel from "../4-models/cradentials-model";
import UserModel from "../4-models/user-model";
import logic from "../5-logic/auth-logic";

const router = express.Router();

// POST http://localhost:3002/api/auth/register
router.post("/auth/register", async (request: Request, response: Response, next: NextFunction) => {

    try{
        // Create user object:
        const user = new UserModel(request.body);
        
        // Register
        const token = await logic.register(user);
        response.status(201).json(token)
    }  
    catch(err: any){
        next(err);
    }
});

// POST http://localhost:3002/api/auth/login
router.post("/auth/login", async (request: Request, response: Response, next: NextFunction) => {
    try{
        
        //  Create credentials object
        const credentials = new CredentialsModel(request.body);

        // Login
        const token = await logic.login(credentials);
        // Return token 
        response.status(200).json(token)
    }
    catch(err: any){
        next(err)
    }
});

// Export all routes from this controller. 
export default router;