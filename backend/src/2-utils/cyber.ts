import UserModel from "../4-models/user-model";
import { Request } from "express";
import jwt from "jsonwebtoken"
import jwtDecode from "jwt-decode"
import { ForbiddenError, UnauthorizedError } from "../4-models/errors-model";
import Role from "../4-models/Role-model";
import crypto from "crypto"

const salt = "ABigMiracleHappenedHere"

// Encrypt the password using hash technique
function hash(plainText: string): string {
    if(!plainText) return null;

    // HMAC: Hash based Message Authentication Code
    const hashText = crypto.createHmac("sha512",salt).update(plainText).digest("hex") // sha512 = Which algorithm to use, salt = A string to insert inside the  | plainText = createHash | hex = turn into a string

    return hashText
}

// create a password that is embedded within the token to prevent content hackers from hacking into the system.
const secret = "limor";

function getNewToken(user: UserModel): string {

    //Object to stash inside the token:
    const payload = { user };

    // Generate new token:
    const token = jwt.sign(payload, secret, { expiresIn: "10h" });

    // Return token
    return token;
};



function verifyToken(request: Request): Promise<boolean> {

    return new Promise<boolean>((resolve, reject) => {

        // Extract token header (autorization: Bearer token):
        const header = request.headers.authorization;
        // If no such header sent:
        if (!header) {
            reject(new UnauthorizedError("No token sent"));
        };

        //Extract the token:
        // Bearer the-token
        //        ^
        // 01234567

        const token = header.substring(7);

        // If no token sent:
        if (!token) {
            reject(new UnauthorizedError("No token sent"));
        };

        // If we have some token:
        jwt.verify(token, secret, (err, payload) => {
            if (err) {
                reject(new UnauthorizedError("Invalid or expired"));
                return;
            }

            resolve(true);
        });

    });
};


function verifyPermissions(request: Request): Promise<boolean> {

    return new Promise<boolean>((resolve, reject) => {

        const header = request.headers.authorization;
        const token = header.substring(7);
        const currentRoleUser = (jwtDecode(token) as any).user.role
        
        let path;

        switch (currentRoleUser) {
            case "User":
                path = [
                    "GET/vacations",
                    "GET/vacations/:id([0-9]+)",
                    "POST/follow/:vacationId([0-9]+)",
                    "DELETE/follow-unfollow/:vacationId([0-9]+)",
                    "GET/follow-status/:vacationId([0-9]+)",
                    "GET/FollowsNumber/:vacationId([0-9]+)",
                    
                ]
                break;

            case "Admin":
                path = [
                    "GET/vacations",
                    "POST/vacations",
                    "PUT/vacations/:id([0-9]+)",
                    "DELETE/vacations/:id([0-9]+)",
                    "GET/vacations/:id([0-9]+)",
                    "GET/follow-status/:vacationId([0-9]+)",
                    "GET/FollowsNumber/:vacationId([0-9]+)",
                ]
                break;
        }
        
        const requiredPath = `${request.method+request.route.path}`;
        const ApprovedRoutes = path.find(element => element === requiredPath)
        
        if (ApprovedRoutes === undefined) {
            reject(new ForbiddenError("You do not have permission"))
            return;
        }
 
        resolve(true)
    });
}

export default {
    getNewToken,
    verifyToken,
    hash,
    verifyPermissions
};