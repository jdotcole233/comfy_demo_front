import { UPDATE_ACCESS_CONTROL } from '../types/SubscriptionTypes'

const initialState = {
    granted: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_ACCESS_CONTROL:
            return {
                ...state
            }
        default:
            return state;
    }
}