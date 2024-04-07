import { useContext, useState, createContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isClicked, setIsClicked] = useState(false);

  const contextValue = {
    isClicked,
    setIsClicked,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useGlobalProvider = () => useContext(AppContext);

export default AppContext;
