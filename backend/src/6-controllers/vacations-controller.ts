import express, { NextFunction, Request, Response } from "express";
import VacationsModel from "../4-models/vacation-model";
import logic from "../5-logic/vacation-logic";
import path from "path";
import fs from "fs";
import { RouteNotFoundError } from "../4-models/errors-model";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import verifyAccess from "../3-middleware/verify-access";

const router = express.Router();

// GET http://localhost:3002/api/vacations
router.get("/vacations", verifyLoggedIn, verifyAccess, async (request: Request, response: Response, next: NextFunction) => {

    try {

        const vacations = await logic.getAllVacations();
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }

});

// GET http://localhost:3002/api/vacations/7 <-- id
router.get("/vacations/:id([0-9]+)", verifyLoggedIn, verifyAccess, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const vacation = await logic.getOneVacation(id);
        response.json(vacation);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:3002/api/vacations
router.post("/vacations", verifyLoggedIn, verifyAccess, async (request: Request, response: Response, next: NextFunction) => {
    try {

        // Take image from request into the body:
        request.body.image = request.files?.image;
        const vacation = new VacationsModel(request.body);
        const addedVacation = await logic.addVacation(vacation);
        response.status(201).json(addedVacation);
    }
    catch (err: any) {
        next(err);
    }
});



// PUT http://localhost:3002/api/vacations/7 <-- id
router.put("/vacations/:id([0-9]+)", verifyLoggedIn, verifyAccess, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.id = +request.params.id;
        request.body.image = request.files?.image;
        const vacation = new VacationsModel(request.body);

        const updatedVacation = await logic.updateFullVacation(vacation);
        response.json(updatedVacation);
    }
    catch (err: any) {
        next(err);
    }
});


// DELETE http://localhost:3002/api/vacations/7 <-- id
router.delete("/vacations/:id([0-9]+)", verifyLoggedIn, verifyAccess, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await logic.deleteVacation(id);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }

});



// GET http://localhost:3002/api/vacations/images/b744485b-bdef-472d-bb4a-46b137961144.jpg
router.get("/vacations/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {

    try {
        const imageName = request.params.imageName;

        const absolutePath = path.join(__dirname, "..", "1-assets", "images", imageName);

        if (!fs.existsSync(absolutePath)) {
            throw new RouteNotFoundError(request.method, request.originalUrl);
        }

        response.sendFile(absolutePath);
    }
    catch (err: any) {
        next(err);
    }
});


export default router;