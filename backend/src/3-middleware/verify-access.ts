import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";


async function verifyAccess(request: Request, response: Response, next: NextFunction) {

    try{
        await cyber.verifyPermissions(request)
        next();
    }
    catch(err: any){
        next(err);
    }
    
};

export default verifyAccess;