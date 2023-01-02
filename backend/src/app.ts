import express, { NextFunction, Request, Response } from "express";
import vacationsController from "./6-controllers/vacations-controller";
import authController from "./6-controllers/auth-controller";
import followersController from "./6-controllers/followers-controller"
import catchAll from "./3-middleware/catch-all";
import { RouteNotFoundError } from "./4-models/errors-model";
import expressFileUpload from "express-fileupload";
import cors from "cors";
import config from "./2-utils/config";
import socketLogic from "./5-logic/socket-logic";

const expressServer = express();

//  Backend approval to browse AJAX to backend API
if (config.isDevelopment) expressServer.use(cors());

// Tell express to extract json object from request body into request.body variable:
expressServer.use(express.json());

expressServer.use("/api",authController);

// Insert received files into request.files object:
expressServer.use(expressFileUpload())

expressServer.use("/api", vacationsController);

expressServer.use("/api", followersController);

//Route not found
expressServer.use("*", (request: Request, response: Response, next: NextFunction) => {
    console.log("---Route not found---")

    const err = new RouteNotFoundError(request.method, request.originalUrl);
    next(err);
});

expressServer.use(catchAll);

const httpServer = expressServer.listen(3002, () => console.log("Listening...."));

socketLogic.init(httpServer);