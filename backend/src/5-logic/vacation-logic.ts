import { OkPacket } from "mysql";
import dal from "../2-utils/dal"
import { ResourceNotFoundError, ValidationError } from "../4-models/errors-model";
import VacationModel from "../4-models/vacation-model";
import { v4 as uuid } from "uuid";
import fs from "fs/promises";
import socketLogic from "./socket-logic";

const imageFilesPath = "./src/1-assets/images/"

// Get all vacations:
async function getAllVacations(): Promise<VacationModel[]> {

    const sql = `SELECT id,destination,description,DATE_FORMAT(formDate,"%d/%m/%Y") AS formDate,DATE_FORMAT(untilDate,"%d/%m/%Y") AS untilDate,price,imageName FROM vacations`;

    const vacations = await dal.execute(sql);
    return vacations;
}

// Get one vacation:
async function getOneVacation(id: number): Promise<VacationModel> {

    const sql = `SELECT id,destination,description,formDate,untilDate,price,imageName FROM vacations WHERE id = ?`;

    const vacations = await dal.execute(sql,[id]);
    const vacation = vacations[0];

    if (!vacation) {
        throw new ResourceNotFoundError(id);
    }

    return vacation;
}

// Add one vacation:
async function addVacation(vacation: VacationModel): Promise<VacationModel> {

    const errors = vacation.validatePost();
    if (errors) {
        throw new ValidationError(errors)
    }

    if (await isDestinationVacationExist(vacation.destination)) {
        throw new ValidationError(`This destination '${vacation.destination}' already exists`)
    }

    // Handling image:
    if (vacation.image) {

        // Generate unique name with original extension:
        const dotIndex = vacation.image.name.lastIndexOf(".");
        const extension = vacation.image.name.substring(dotIndex); // return part of the string 
        vacation.imageName = uuid() + extension; // example: 75045ec6-bcb6-4900-b7e5-284cb66110ad.png/jpg...

        // Save in disk:
        await vacation.image.mv(imageFilesPath + vacation.imageName)

        
        // Don't return back image file:
        delete vacation.image;
    }

    const sql = `INSERT INTO vacations(	destination, description, formDate, untilDate, price, imageName )
     VALUES(?,?,?,?,?,?)`;

    const result: OkPacket = await dal.execute(sql,[vacation.destination,vacation.description,vacation.formDate, vacation.untilDate, vacation.price, vacation.imageName]);
    vacation.id = result.insertId

    // Report via socket.io a new vacation has been added by the admin:
    socketLogic.reportAddVacation(vacation)

    return vacation
}

// Update full vacation:
async function updateFullVacation(vacation: VacationModel): Promise<VacationModel> {

    const errors = vacation.validatePut();
    if (errors) {
        throw new ValidationError(errors);
    }

    // Check that updated destination does not already exist in the system 
    const updatedDestination = vacation.destination;
    const previousDestination = (await getOneVacation(vacation.id)).destination;
    if (await isDestinationVacationExist(vacation.destination) && updatedDestination !== previousDestination) {
        throw new ValidationError(`This destination '${vacation.destination}' already exists`)
    };


    // Handling image:
    if (vacation.image) {
        // Delete the image from the disk:
        const vacationId = await vacation.id;
        const imageNameToDelete: string = (await getOneVacation(vacationId)).imageName;
        if (imageNameToDelete !== "") {
            await fs.unlink(imageFilesPath + imageNameToDelete)
            
        };

        // Generate unique name with original extension:
        const dotIndex = vacation.image.name.lastIndexOf(".");
        const extension = vacation.image.name.substring(dotIndex);
        vacation.imageName = uuid() + extension; // example: 75045ec6-bcb6-4900-b7e5-284cb66110ad.png/jpg...
        // Save in disk:
        await vacation.image.mv(imageFilesPath+ vacation.imageName)

        // Don't return back image file:
        delete vacation.image;
    }

    const sql = `UPDATE vacations SET destination = ?, description = ?, formDate = ?, untilDate = ?, price = ?, imageName = ? WHERE id = ?`;
    const result: OkPacket = await dal.execute(sql,[vacation.destination,vacation.description,vacation.formDate, vacation.untilDate, vacation.price, vacation.imageName, vacation.id]);

    if (result.affectedRows === 0) {
        throw new ResourceNotFoundError(vacation.id)
    }

    // Report via socket.io an existing vacation has been updated by the admin:
    socketLogic.reportUpdateVacation(vacation)

    return vacation;
}



// Delete vacation:
async function deleteVacation(id: number): Promise<void> {

    // Delete the image from the disk:
    const imageNameToDelete: string = (await getOneVacation(id)).imageName;
    if (imageNameToDelete !== "") {
        await fs.unlink(imageFilesPath + imageNameToDelete)
    }

    const sql = `DELETE FROM vacations WHERE Id = ?`;
    const result = await dal.execute(sql,[id]);
    if (result.affectedRows === 0) {
        throw new ResourceNotFoundError(id);
    }

    // Report via socket.io an existing clothing has been deleted by the admin: 
    socketLogic.reportDeleteVacation(id)

}


// Internal function to check if the destination already exists:
async function isDestinationVacationExist(destination: string): Promise<boolean> {
    const sql = `SELECT COUNT(destination) as count FROM vacations WHERE destination = ?`;
    const result = await dal.execute(sql,[destination]);
    const count = result[0].count;
    return count > 0;
}

export default {
    getAllVacations,
    getOneVacation,
    addVacation,
    updateFullVacation,
    deleteVacation,
};