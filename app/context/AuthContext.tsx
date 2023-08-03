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
  login: (userData: LoginForm) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => useContext(AuthContext);
export const userId = 'userId';
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
      save(userId, data.user.id),
      saveString(tokenKey, data.accessToken),
    ]);
    await setToken();
  };

  const logout = async () => {
    setUser(null);
    await Promise.all([remove(tokenKey), remove(userId)]);
  };

  const getUserFromStorage = async () => {
    const hasToken = await load(tokenKey);
    const hasUserId = await load(userId);
    if (hasToken && hasUserId) {
      const user = await userApi.loadUser(hasUserId as string);
      setUser(user);
      await setToken();
    }
  };

  const setToken = async () => {
    const token = await loadString(tokenKey);
    if (token) {
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
