import { createContext } from 'react';
import { User } from '../Types/User';
import { Company } from '../Types/Company';

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  companyDetails: Company | null;
  setCompanyDetails: (company: Company | null) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);