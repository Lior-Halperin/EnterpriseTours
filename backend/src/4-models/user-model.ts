import Joi from "joi";
import Role from "./Role-model";

class UserModel {

    public userId: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;
    public role: Role;

     
    // Copy - Constructor
    public constructor(user: UserModel) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
        this.role = user.role;
    }

    // Model validation:

    // POST register Validation Schema:
    private static postRegisterValidationSchema = Joi.object({
        userId: Joi.forbidden(),
        firstName: Joi.string().required().min(2).max(25),
        lastName: Joi.string().required().min(2).max(25),
        username: Joi.string().required().min(2).max(25),
        password: Joi.string().required().min(4).max(15),
        role: Joi.string()
    });



    // Validate POST register:
    public validatePostRegister() : string {
        const result = UserModel.postRegisterValidationSchema.validate(this,{abortEarly:false});
        return result.error?.message;
    };

    // i did not validate the login intentionally so as not to give the hackers useful information.


};



export default UserModel;