import React from 'react';

const BrokerContext = React.createContext({
    brokers:[],
    overview: {},
});

export const useBrokerContext = () => React.useContext(BrokerContext);
export const BrokerProvider = BrokerContext.Provider;




