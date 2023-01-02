import fs from "fs/promises";
import { NextFunction, Request, Response } from "express";

const filePath = "./src/1-assets/err.txt"


async function catchAll(err: any, request: Request, response: Response, next: NextFunction) {
    
    const status = err.status || 500;
    const message = err.message || "Unknown Error";

    if (status === 500) {

        const now = new Date();
        const method = request.method;
        const route = request.originalUrl;
        const ip = request.ip;

        const data = `Time: ${now.toLocaleString()}, Method: ${method}, Route: ${route},
        err status: ${status}, err message: ${message}, ip:${ip}\n\n`;

        await fs.appendFile(filePath, data);
    }

    response.status(status).send(message);

}

export default catchAll;