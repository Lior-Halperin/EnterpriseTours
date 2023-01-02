import VacationsModel from "../Models/VacationModel";

// 1. State - The global state relate to vacations
export class VacationState {

    public vacations: VacationsModel[] = []; // Initializes to an empty array at first avoid malfunctions 

}

// // 2. Action Type - list of actions we can do on the above vacationState:
export enum VacationsActionType {
    FetchVacations = "FetchVacations", // Bring the vacations
    AddVacation = "AddVacation",
    UpdateVacation = "UpdateVacation",
    DeleteVacation = "DeleteVacation",
}

// 3. Action - interface for building a single action from above VacationsActionType
export interface VacationAction {
    type: VacationsActionType; // The type of the acton to perform.
    payload: any; // The data we need to do that action.
}

// 4. Action Creators - Functions for creating suitable Action objects: 

export function fetchVacationAction(vacation: VacationsModel[]): VacationAction {
    const action: VacationAction = { type: VacationsActionType.FetchVacations, payload: vacation }
    return action
}

export function addVacationAction(vacation: VacationsModel): VacationAction {
    const action: VacationAction = { type: VacationsActionType.AddVacation, payload: vacation }
    return action
}

export function updateVacationAction(vacation: VacationsModel): VacationAction {
    const action: VacationAction = { type: VacationsActionType.UpdateVacation, payload: vacation }
    return action
}

export function deleteVacationAction(id: number): VacationAction {
    const action: VacationAction = { type: VacationsActionType.DeleteVacation, payload: id }
    return action
}



// 5. Reducer - Do any of the above actions:
export function vacationsReducer(currentState: VacationState = new VacationState(), action: VacationAction) {
    const newState = { ...currentState };

    switch (action.type) {

        case VacationsActionType.FetchVacations:
            newState.vacations = action.payload; // <-- here payload is all vacation
            break;

        case VacationsActionType.AddVacation:
            newState.vacations.push(action.payload); // <-- here payload is the vacation to add.
            break;

        case VacationsActionType.UpdateVacation:
            const indexToUpdate = newState.vacations.findIndex(v => v.id === action.payload.id); // <-- here payload is the vacation to update.
            if(indexToUpdate >= 0){
                newState.vacations[indexToUpdate] = action.payload;
            }
            break;

        case VacationsActionType.DeleteVacation:
            const indexToDelete = newState.vacations.findIndex( v => v.id === action.payload);
            if(indexToDelete >= 0){
                newState.vacations.splice(indexToDelete,1)
            }
            break;

    }

    return newState;
}