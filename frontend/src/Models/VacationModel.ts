// import { UploadedFile } from "express-fileupload";

class VacationsModel {
    public id: number;
    public destination: string;
    public description: string;
    public formDate: string;
    public untilDate: string;
    public price: number;
    public imageName: string;
    public image: FileList;


    public constructor(vacation: VacationsModel){

        this.id = vacation.id;
        this.destination = vacation.destination;
        this.description = vacation.description ;
        this.formDate = vacation.formDate ;
        this.untilDate= vacation.untilDate;
        this.price = vacation.price;
        this.imageName = vacation.imageName || "";
        this.image = vacation.image;
    }
}

export default VacationsModel;