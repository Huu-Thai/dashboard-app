import React from 'react';

interface AuthContextType {
  authToken: string | null;
  profile: object | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType>({
  authToken: null,
  profile: null,
  login: () => {},
  logout: () => {},
});

export default AuthContext;