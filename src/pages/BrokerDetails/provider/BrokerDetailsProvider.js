import React from 'react';


const BrokerDetailsContext = React.createContext({
    broker: {},
    overview: null,
    associates: [],
    treaties: []
});

export const useBrokerDetailsContext = () => React.useContext(BrokerDetailsContext);
export const BrokerDetailsProvider = BrokerDetailsContext.Provider;