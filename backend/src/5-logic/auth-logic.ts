import { OkPacket } from "mysql";
import cyber from "../2-utils/cyber";
import dal from "../2-utils/dal";
import CredentialsModel from "../4-models/cradentials-model";
import { UnauthorizedError, ValidationError } from "../4-models/errors-model";
import Role from "../4-models/Role-model";
import UserModel from "../4-models/user-model";



// Register
async function register(user: UserModel): Promise<string> {


    const error = user.validatePostRegister();

    if (error) {
        throw new UnauthorizedError(error)
    };

    if (await isUsernameAlreadyTaken(user.username)) {
        throw new ValidationError(`The username: '${user.username}', is already taken, Please select another username`)
    };

    // Hash password before saving in db:
    user.password = cyber.hash(user.password)

    const sql = `INSERT INTO users(firstName, lastName, username, password, role) VALUES(?,?,?,?,?)`;

    const result: OkPacket = await dal.execute(sql,[user.firstName, user.lastName, user.username, user.password, Role.User]);

    user.userId = result.insertId
    user.role = Role.User

    // Delete password before returning user:
    delete user.password

    // Generate token:
    const token = cyber.getNewToken(user);

    return token
};

async function login(credentials: CredentialsModel): Promise<string> {

    // Joi Validation
    const error = credentials.validatePost();

    // Hash password before comparing to db:
    credentials.password = cyber.hash(credentials.password)

    // Get the user by username and password
    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;

    const result = await dal.execute(sql,[credentials.username, credentials.password]);

    if (error || result.length === 0) {
        throw new UnauthorizedError("Incorrect username or password Please try again")
    };

    // Delete password before returning user:
    delete result[0].password

    const token = cyber.getNewToken(result[0])

    return token;
};

// Internal function to check if the username is already taken:
async function isUsernameAlreadyTaken(username: string): Promise<boolean> {
    const sql = `SELECT EXISTS(SELECT *  FROM users WHERE username = ?) as isExists`;
    const result = await dal.execute(sql,[username]);
    const isExists = result[0].isExists;
    return isExists === 1;
};

export default {
    register,
    login
}