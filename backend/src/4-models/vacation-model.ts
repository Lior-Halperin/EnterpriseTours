import { UploadedFile } from "express-fileupload";
import Joi from "joi";

class VacationsModel {
    static validatePost() {
        throw new Error("Method not implemented.");
    }

    public id: number;
    public destination: string;
    public description: string;
    public formDate: string;
    public untilDate: string;
    public price: number;
    public imageName: string ; 
    public image: UploadedFile; 


    public constructor(vacation: VacationsModel){

        this.id = vacation.id;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.formDate = vacation.formDate ;
        this.untilDate= vacation.untilDate;
        this.price = vacation.price;
        this.imageName = vacation.imageName || "";
        this.image = vacation.image;
    }

    private static postValidationSchema = Joi.object({
         id: Joi.number().integer().min(1),
         destination: Joi.string().required().min(2).max(20),
         description: Joi.string().optional().min(5).max(50),
         formDate: Joi.date().optional(),
         untilDate: Joi.date().optional(),
         price: Joi.number().required().min(0).max(10000),
         imageName: Joi.string().optional().min(0),
         image: Joi.object().optional()
    });

    private static putValidationSchema = Joi.object({
        id: Joi.number().required().integer().min(1),
        destination: Joi.string().required().min(2).max(20),
        description: Joi.string().optional().min(5).max(50),
        formDate: Joi.date().required(),
        untilDate: Joi.date().required(),
        price: Joi.number().required().min(0).max(10000),
        imageName: Joi.string().optional().min(0),
        image: Joi.object().optional()
   });

   private static patchValidationSchema = Joi.object({
    id: Joi.number().required().integer().min(1),
    destination: Joi.string().optional().min(2).max(20),
    description: Joi.string().optional().min(5).max(50),
    formDate: Joi.date().optional(),
    untilDate: Joi.date().optional(),
    price: Joi.number().optional().min(0).max(10000),
    imageName: Joi.string().optional().min(0),
    image: Joi.object().optional()
});

    //Validate POST
    public validatePost(): string {
        const result = VacationsModel.postValidationSchema.validate(this, {abortEarly:false})
        return result.error?.message;
    }
    //Validate PUT
    public validatePut(): string {
        const result = VacationsModel.putValidationSchema.validate(this, {abortEarly:false})
        return result.error?.message;
    }
    //Validate PATCH
    public validatePatch(): string {
        const result = VacationsModel.patchValidationSchema.validate(this, {abortEarly:false})
        return result.error?.message;
    }
}



export default VacationsModel;
