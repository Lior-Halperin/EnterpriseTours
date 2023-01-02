import axios from "axios"
import VacationsModel from "../Models/VacationModel";
import { addVacationAction, deleteVacationAction, fetchVacationAction, updateVacationAction } from "../Redux/VacationState";
import store from "../Redux/Store";
import config from "../Utils/Config";


class VacationsService {

    // Get all vacations:

    public async getAllVacations(): Promise<VacationsModel[]>{
        let vacations = store.getState().vacationsState.vacations; // get from redux library the data held by it.
        if(vacations.length === 0){ // If no data is accessed get it from the server
            const response = await axios.get<VacationsModel[]>(config.vacationsUrl);
            vacations = response.data;
            store.dispatch(fetchVacationAction(vacations)); // Add vacations to Redux.
        }
        // אפשר לעשות טריי קצ' שאם יש שגיאה אז ינווט ללוג אין ומוחק לוקלסטורג אולי לכתוב את זה במקום אחר
        return vacations;
    }

    // Get one vacation by id:
    public async getVacationById(id: number): Promise<VacationsModel>{
       const vacations = await this.getAllVacations();
       const vacation = vacations.find( v => v.id === id);
       return vacation;
    }

    // Add new vacation:

    public async addVacation(vacation: VacationsModel): Promise<VacationsModel>{

        const formData = new FormData();
        formData.append("destination", vacation.destination);
        formData.append("description", vacation.description);
        formData.append("formDate", vacation.formDate.toString()); // Can send only strings (and files).
        formData.append("untilDate",vacation.untilDate.toString());
        formData.append("price",vacation.price.toString());
        formData.append("image", vacation.image.item(0))

        const response = await axios.post<VacationsModel>(config.vacationsUrl, formData);
        const addedVacation = response.data;

        store.dispatch(addVacationAction(addedVacation)); // Add to Redux

        return addedVacation;
    }
    
        // Update existing product:
        public async updateVacation(vacation: VacationsModel): Promise<VacationsModel>{

            const formData = new FormData();
            formData.append("destination", vacation.destination);
            formData.append("description", vacation.description);
            formData.append("formDate", vacation.formDate.toString()); // Can send only strings (and files).
            formData.append("untilDate",vacation.untilDate.toString());
            formData.append("price",vacation.price.toString());
            formData.append("imageName",vacation.imageName.toString());
            formData.append("image", vacation.image.item(0))
    
            const response = await axios.put<VacationsModel>(config.vacationsUrl + vacation.id, formData);
            const updateVacation = response.data;
    
            store.dispatch(updateVacationAction(updateVacation)); // Add to Redux
    
            return updateVacation;
        }        

        
    // Delete existing vacation by id:
    public async deleteVacation(id: number): Promise<void> {
        await axios.delete(config.vacationsUrl + id)
        store.dispatch(deleteVacationAction(id));
    }

}

const vacationsService = new VacationsService();

export default vacationsService;
