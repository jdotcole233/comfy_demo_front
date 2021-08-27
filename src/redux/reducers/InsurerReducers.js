import { GET_INSURERS, SELECT_INSURER, UPDATE_INSURERS, CHANGE_INSURER_PAGE_TYPE, GET_INSURER } from "../types/InsurerTypes";

const initialState = {
    insurers: [],
    insurer: null,
    insurer_id: "",
    treaties: [],
    offers: [],
    type: "Fac"
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_INSURERS:
        case UPDATE_INSURERS:
            return {
                ...state,
                insurers: action.payload
            }
        case GET_INSURER:
            return {
                ...state,
                insurer: action.payload
            }
        case SELECT_INSURER:
            return {
                ...state,
                insurer_id: action.payload
            }
        case CHANGE_INSURER_PAGE_TYPE:
            return {
                ...state,
                type: action.payload
            }
        default:
            return state
    }
}