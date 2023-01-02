
class followersModel {

    public vacationId: number;
    public userId: number;

    public constructor(follower: followersModel) {
        this.vacationId = follower.vacationId;
        this.userId = follower.userId;
    }
}

export default followersModel;