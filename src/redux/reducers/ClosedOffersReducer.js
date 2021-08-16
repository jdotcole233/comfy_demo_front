import { FETCH_CLOSED_OFFERS } from "../types/ClosedOffersTypes";

const initialState = {
    offers: [],
    overview: null
};


export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CLOSED_OFFERS:
            return {
                ...state,
                offers: action.offers,
                overview: action.overview
            }
        default:
            return state;
    }
}