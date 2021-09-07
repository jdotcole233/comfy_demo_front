import { createContext, useContext } from "react";

const ReinsurerContext = createContext({
    reinsurers: [],
    loading: true
});

export const useReinsurerProps = () => useContext(ReinsurerContext);
const ReinsurersProvider = ReinsurerContext.Provider;

export default ReinsurersProvider


