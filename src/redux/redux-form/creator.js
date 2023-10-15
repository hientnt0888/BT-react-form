import { ConstForm } from "./const";

export const submitCreator = (payload) => { 
    return {
        type: ConstForm.submit,
        payload,
    }
 }
 export const editCreator = (payload) => { 
    return {
        type: ConstForm.edit,
        payload,
    }
 }
 export const deleteCreator = (payload) => { 
    return {
        type: ConstForm.delete,
        payload,
    }
 }