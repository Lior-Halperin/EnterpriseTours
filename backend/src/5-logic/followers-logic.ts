
import dal from "../2-utils/dal";
import { ValidationError } from "../4-models/errors-model";
import followersModel from "../4-models/followers-model";
import jwtDecode from "jwt-decode"
import { Request } from "express";

async function addFollowerToVacation(follower: followersModel): Promise<followersModel> {

    if (await FollowStatus(follower)) {
        throw new ValidationError(`This user is already following this vacation`)
    }

    const sql = `INSERT INTO followers(vacationId, userId) VALUES(?,?)`;
    await dal.execute(sql,[follower.vacationId,follower.userId]);
    return follower
}

async function deleteFollower(follower: followersModel): Promise<void> {

    const sql = `DELETE FROM followers WHERE vacationId = ? AND userId = ?`;
    await dal.execute(sql,[follower.vacationId, follower.userId]);
}

async function FollowStatus(follower: followersModel): Promise<boolean> {
    const sql = `SELECT vacationId, userId FROM followers WHERE vacationId = ? AND userId = ?;`
    const result = await dal.execute(sql,[follower.vacationId, follower.userId]);
    const resultLength = result.length;
    return resultLength > 0
}

async function FollowsNumber(follower: number): Promise<number> {
    const sql = `SELECT vacationId, userId FROM followers WHERE vacationId = ?;`
    const result = await dal.execute(sql,[follower]);
    const resultLength = result.length;
    return resultLength 
}

function getNewFollowersModel(request: Request): followersModel {
    const header = request.headers.authorization;
    const token = header.substring(7);
    const currentUserModel = (jwtDecode(token) as any).user.userId
    const vacationId = +request.params.vacationId;
    const userId = currentUserModel
    const newFollowerModel = new followersModel({ "vacationId": vacationId, "userId": userId });
    return newFollowerModel

}



export default {
    addFollowerToVacation,
    deleteFollower,
    FollowStatus,
    getNewFollowersModel,
    FollowsNumber
};