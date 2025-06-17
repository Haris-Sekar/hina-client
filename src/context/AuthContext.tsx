import { useState, useEffect, FC, ReactNode } from 'react';
import { User } from '../Types/User';
import { Company } from '../Types/Company';
import { AuthContext } from './AuthContextObject';
 

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!localStorage.getItem('token'));
  const [companyDetails, setCompanyDetails] = useState<Company | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('TOKEN'); // Use your actual token key
    setIsAuthenticated(!!token);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setCompanyDetails(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        companyDetails,
        setCompanyDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};