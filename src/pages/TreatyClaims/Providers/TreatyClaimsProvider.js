import { createContext, useContext } from "react";

const TreatyClaimsContext = createContext({
  claims: [],
  count: 0,
  loading: true,
});
export const useTreatyClaimsProps = () => useContext(TreatyClaimsContext);
const TreatyClaimsProvider = TreatyClaimsContext.Provider;

export default TreatyClaimsProvider;
