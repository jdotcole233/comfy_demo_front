import { combineReducers } from 'redux';
import appReducer from './AppReducer';
import insurerReducers from './InsurerReducers';
import reinsurerReducer from './ReinsurersReducer';
import closedOffersReducer from './ClosedOffersReducer'

export default combineReducers({
    reinsurer: reinsurerReducer,
    insurer: insurerReducers,
    app: appReducer,
    closedoffers: closedOffersReducer
})

