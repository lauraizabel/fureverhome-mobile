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
import { IFile, IUser } from 'app/data/models';
import api from 'app/data/services/api';

interface AuthContextData {
  user: IUser | null;
  login: (userData: LoginForm) => Promise<void>;
  logout: () => void;
  setPicture: (picture: IFile) => void;
  setCurrentUser: (user: IUser) => void;
  loadingUser: boolean;
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
  const [loadingUser, setLoadingUser] = useState(false);

  const setPicture = (picture: IFile) => {
    if (picture && user) {
      setUser({ ...user, picture });
    }
  };

  const login = async (dataForm: LoginForm) => {
    const data = await userApi.login(dataForm);
    setUser(data.user);
    await Promise.all([
      save(userId, data.user.id),
      saveString(tokenKey, data.accessToken),
    ]);
    await setToken();
  };

  const setCurrentUser = async (user: IUser) => {
    setUser(user);
  };

  const getUserFromStorage = async () => {
    setLoadingUser(true);
    const hasToken = await loadString(tokenKey);
    const hasUserId = await loadString(userId);

    if (hasToken && hasUserId) {
      await setToken();
      const user = await userApi.loadUser(hasUserId as string);
      setUser(user);
    }
    setLoadingUser(false);
  };

  const setToken = async () => {
    const token = await loadString(tokenKey);
    if (token) {
      api.client.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  };

  const logout = async () => {
    setUser(null);
    await Promise.all([remove(tokenKey), remove(userId)]);
  };

  const authContextProviderValue = useMemo(
    () => ({
      user,
      login,
      logout,
      setPicture,
      setCurrentUser,
      loadingUser,
    }),
    [user, login, logout, setPicture, setCurrentUser, loadingUser],
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
