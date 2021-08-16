import { GET_REINSURERS, SELECT_REINSURER, UPDATE_REINSURERS, CHANGE_REINSURER_PAGE_TYPE, GET_REINSURER } from "../types/ReinsurerTypes";

const initialState = {
    reinsurers: [],
    reinsurer: null,
    reinsurer_id: "",
    treaties: [],
    offers: [],
    type: "Fac"
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_REINSURERS:
        case UPDATE_REINSURERS:
            return {
                ...state,
                reinsurers: action.payload
            }
        case GET_REINSURER:
            return {
                ...state,
                reinsurer: action.payload
            }
        case SELECT_REINSURER:
            return {
                ...state,
                reinsurer_id: action.payload
            }
        case CHANGE_REINSURER_PAGE_TYPE:
            return {
                ...state,
                type: action.payload
            }
        default:
            return state
    }
}