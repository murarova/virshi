import { createContext, useContext } from 'react';

const AuthContext = createContext({
  isLoggedIn: false
});

export const AuthContextProvider = (props) => <AuthContext.Provider { ...props } />;

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

AuthContextProvider.displayName = 'AuthProvider';

