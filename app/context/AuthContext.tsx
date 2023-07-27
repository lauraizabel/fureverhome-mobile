import { LoginForm } from 'app/screens/Public/Welcome/Form/WelcomeForm';
import { userApi } from 'app/data/services/user/user.api';
import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from 'react';
import { load, loadString, remove, save, saveString } from 'app/utils/storage';
import { IUser } from 'app/data/models';
import api from 'app/data/services/api';

interface AuthContextData {
  user: IUser | null;
  login: (userData: LoginForm) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => useContext(AuthContext);
export const userKey = 'user';
export const tokenKey = 'token';
interface AuthProvider {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProvider> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const login = async (dataForm: LoginForm) => {
    const data = await userApi.login(dataForm);
    setUser(data.user);
    await Promise.all([
      save(userKey, data.user),
      saveString(tokenKey, data.accessToken),
    ]);
    await setToken();
  };

  const logout = async () => {
    setUser(null);
    await Promise.all([remove(userKey), remove(tokenKey)]);
  };

  const getUserFromStorage = async () => {
    const userLoaded = await load(userKey);
    if (userLoaded) {
      setUser(userLoaded as IUser);
      await setToken();
    }
  };

  const setToken = async () => {
    const token = await loadString(tokenKey);
    if (token) {
      console.log({ token });
      api.client.defaults.headers.common.Authorization = `Bearer ${token}`;
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
