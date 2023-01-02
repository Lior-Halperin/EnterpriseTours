import Joi from "joi";

class CredentialsModel{

    public username: string;
    public password: string;

    public constructor(user: CredentialsModel){
        
        this.username = user.username;
        this.password = user.password;

    };

    // Model validation:

    private static postValidationCredentials = Joi.object({
        username: Joi.string().required().min(2).max(25),
        password: Joi.string().required().min(4).max(15)

    });

    // Validate POST

    public validatePost(): string {
        const result = CredentialsModel.postValidationCredentials.validate(this);
        return result.error?.message;
    }


};

export default CredentialsModel;