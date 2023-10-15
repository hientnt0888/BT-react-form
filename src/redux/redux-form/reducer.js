import { ConstForm } from "./const";
const STATE_TTSV = {
    DSSV: [],
}
export const formReducer = (state = STATE_TTSV, action) => {
    switch (action.type) {
        case ConstForm.submit:
            state.DSSV.push(action.payload)
            console.log(state.DSSV)
            return { ...state }
        default:
            return { ...state }
    }

}