import { ConstForm } from "./const";

export const submitCreator = (payload) => { 
    return {
        type: ConstForm.submit,
        payload,
    }
 }