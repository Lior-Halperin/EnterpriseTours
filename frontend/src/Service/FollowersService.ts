import axios from "axios";
import FollowersModel from "../Models/FollowersModel";
import config from "../Utils/Config";

class FollowersService {

    public async addFollow(vacationId: number): Promise<FollowersModel> {
        const response = await axios.post<FollowersModel>(config.followersUrl + vacationId);
        const addedFollower = response.data;
        return addedFollower;
    }

    public async deleteFollow(vacationId: any): Promise<void> {
        await axios.delete(config.unfollowUrl  + vacationId);
    }

    public async followStatus(vacationId: number): Promise<boolean> {
        const response = await axios.get<boolean>(config.followerStatusUrl + vacationId)
        const followStatus = response.data
        return followStatus
    }

public async followNumber(vacationId: number): Promise<number> {
    const response = await axios.get<number>(config.followsNumberUrl + vacationId)
    const followStatus = response.data
    return followStatus
}

}

const followersService = new FollowersService();

export default followersService;