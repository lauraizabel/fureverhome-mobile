import { IAuthentication } from 'app/data/models/Authentication';
import { LoginForm } from 'app/screens/Public/Welcome/Form/WelcomeForm';
import { userApi } from 'app/data/services/user/user.api';
import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from 'react';
import { load, remove, save } from 'app/utils/storage';

interface AuthContextData {
  user: IAuthentication | null;
  login: (userData: LoginForm) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => useContext(AuthContext);

interface AuthProvider {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProvider> = ({ children }) => {
  const [user, setUser] = useState<IAuthentication | null>(null);
  const userKey = 'user';

  const login = async (data: LoginForm) => {
    const userData = await userApi.login(data);
    setUser(userData);
    await save(userKey, userData);
  };

  const logout = () => {
    setUser(null);
    remove(userKey);
  };

  const getUserFromStorage = async () => {
    const userLoaded = await load(userKey);
    if (userLoaded) {
      setUser(userLoaded as IAuthentication);
    }
  };

  const authContextProviderValue = useMemo(
    () => ({ user, login, logout }),
    [user, login, logout],
  );

  useEffect(() => {
    getUserFromStorage();
  }, []);

  return (
    <AuthContext.Provider value={authContextProviderValue}>
      {children}
    </AuthContext.Provider>
  );
};
