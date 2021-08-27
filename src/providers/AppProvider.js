import { createContext, useContext } from 'react';

const AppContext = createContext({ granted: false });


export const useAppProps = () => useContext(AppContext);
const AppProvider = AppContext.Provider;

export default AppProvider;