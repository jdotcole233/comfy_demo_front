import { createContext, useContext } from "react";


const InsurerContext = createContext({
    insurers: [],
    associates: 0,
    loading: true
});

// const InsurersContext = createContext({ insurers: [], loading: true })

export const useInsurerProps = () => useContext(InsurerContext);
const InsurerProvider = InsurerContext.Provider;

export default InsurerProvider;