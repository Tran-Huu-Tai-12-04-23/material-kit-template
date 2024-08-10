import PropTypes from 'prop-types';
import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ user: null, enumData: null });

  const login = (data) => {
    setAuthState({ user: data.user, enumData: data.enumData });
  };

  const logout = () => {
    setAuthState({ user: null, enumData: null });
  };

  const contextValue = useMemo(
    () => ({ ...authState, login, logout }),
    [authState]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
