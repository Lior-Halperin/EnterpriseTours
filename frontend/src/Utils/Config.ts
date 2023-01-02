class Config {

    public supportEmail = "halperin@gmail.com";
    public supportPhone = "0325642153";
    public supportPage = "";
    public registerUrl = "";
    public loginUrl = "";
    public vacationsUrl = "";
    public vacationImagesUrl = "";
    public followersUrl = "";
    public unfollowUrl = "";
    public followerStatusUrl = "";
    public followsNumberUrl = "";

}

class DevelopmentConfig extends Config {
    public supportPage = "";
    public registerUrl = "http://localhost:3002/api/auth/register";
    public loginUrl = "http://localhost:3002/api/auth/login";
    public vacationsUrl = "http://localhost:3002/api/vacations/";
    public vacationImagesUrl = "http://localhost:3002/api/vacations/images/";
    public followersUrl = "http://localhost:3002/api/follow/";
    public unfollowUrl = "http://localhost:3002/api/follow-unfollow/";
    public followerStatusUrl = "http://localhost:3002/api/follow-status/";
    public followsNumberUrl = "http://localhost:3002/api/FollowsNumber/";
}

class TestConfig extends Config {
    public supportPage = "";
    public registerUrl = "http://localhost:3002/api/auth/register";
    public loginUrl = "http://localhost:3002/api/auth/login";
    public vacationsUrl = "http://localhost:3002/api/vacations/";
    public vacationImagesUrl = "http://localhost:3002/api/vacations/images/";
    public followersUrl = "http://localhost:3002/api/follow/";
    public unfollowUrl = "http://localhost:3002/api/follow-unfollow/";
    public followerStatusUrl = "http://localhost:3002/api/follow-status/";
    public followsNumberUrl = "http://localhost:3002/api/FollowsNumber/";

}

class ProductionConfig extends Config {
    public supportPage = "";
    public registerUrl = "http://localhost:3002/api/auth/register";
    public loginUrl = "http://localhost:3002/api/auth/login";
    public vacationsUrl = "http://localhost:3002/api/vacations/";
    public vacationImagesUrl = "http://localhost:3002/api/vacations/images/";
    public followersUrl = "http://localhost:3002/api/follow/";
    public unfollowUrl = "http://localhost:3002/api/follow-unfollow/";
    public followerStatusUrl = "http://localhost:3002/api/follow-status/";
    public followsNumberUrl = "http://localhost:3002/api/FollowsNumber/";

}

let config: Config;

if (process.env.NODE_ENV === "development") {
    config = new DevelopmentConfig();
}

else if (process.env.NODE_ENV === "test") {
    config = new TestConfig();
}

else if (process.env.NODE_ENV === "production") {
    config === new ProductionConfig();
}

export default config;