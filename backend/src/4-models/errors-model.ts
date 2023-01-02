class ClientError{

    public status: number;
    public message: string;

    public constructor(status: number, message: string) {
        this.status = status;
        this.message = message;
    }
}

// Frontend requesting resource with id we don't have:
export class ResourceNotFoundError extends ClientError {
    public constructor (id: number){
        super(404, `id ${id} not found`) // The super keyword is used to call the constructor of its parent class to access the parent's properties.
    }
}

// Frontend requesting a non existing route:
export class RouteNotFoundError extends ClientError {
    public constructor(route: string, method: string){
        super (404, `Route ${route} on method ${method} not exist`);
    }

}

// Frontend trying to POST/PUT/PATH an object with validation errors:
export class ValidationError extends ClientError {
    public constructor(message: string){
        super(400,message);
    }
}

// User failed login or tries to enter somewhere but we don't know who the user is:
export class UnauthorizedError extends ClientError {
    public constructor(message: string) {
        super(401, message)
    }
}

// User tries to enter somewhere which he don't have permission to:
export class ForbiddenError extends ClientError {
    public constructor(message: string) {
        super(403, message)
    }
}

