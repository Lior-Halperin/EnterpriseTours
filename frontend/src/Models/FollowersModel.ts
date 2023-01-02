
class FollowersModel {

    public vacationId: number;
    public userId: number;

    public constructor(follower: FollowersModel) {
        this.vacationId = follower.vacationId;
        this.userId = follower.userId;
    }
}

export default FollowersModel;