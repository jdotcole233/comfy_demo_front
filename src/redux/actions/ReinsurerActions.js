import { GET_REINSURERS } from "../types/ReinsurerTypes"


export const updateReinsurers = reinsurers => {
    return {
        type: GET_REINSURERS,
        payload: reinsurers
    }
}