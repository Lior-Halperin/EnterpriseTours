
import express, { NextFunction, Request, Response, } from "express"
import verifyAccess from "../3-middleware/verify-access";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import logic from "../5-logic/followers-logic";

const router = express.Router();

// POST http://localhost:3002/api/follow/8 <-- vacationId
router.post("/follow/:vacationId([0-9]+)", verifyLoggedIn,verifyAccess, async (request: Request, response: Response, next: NextFunction) => {

    try {
        const follow = logic.getNewFollowersModel(request)
        const addedFollowerVacation = await logic.addFollowerToVacation(follow);
        response.status(201).json(addedFollowerVacation)
    }

    catch (err: any) {
        next(err);
    }

});

// DELETE http://localhost:3002/api/follow-unfollow:7 <----vacationId
router.delete("/follow-unfollow/:vacationId([0-9]+)", verifyLoggedIn,verifyAccess, async (request: Request, response: Response, next: NextFunction) => {
    try {

        const follow = logic.getNewFollowersModel(request)
        await logic.deleteFollower(follow)
        response.sendStatus(204)
    }
    catch (err: any) {
        next(err)
    }
});

// get http://localhost:3002/api/follow-status/9 <--- vacationId
router.get("/follow-status/:vacationId([0-9]+)", verifyLoggedIn,verifyAccess, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const follow = logic.getNewFollowersModel(request)
        const followStatus = await logic.FollowStatus(follow);
        response.status(200).json(followStatus)

    }
    catch (err: any) {
        next(err)
    }
});

// get http://localhost:3002/api/FollowsNumber/9 <--- vacationId
router.get("/FollowsNumber/:vacationId([0-9]+)", verifyLoggedIn,verifyAccess, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        const followsNumber = await logic.FollowsNumber(vacationId);
        response.status(200).json(followsNumber)

    }
    catch (err: any) {
        next(err)
    }
});

export default router;