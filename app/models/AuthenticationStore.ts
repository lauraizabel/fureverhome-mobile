import { Instance, SnapshotOut, types } from 'mobx-state-tree';

export const AuthenticationStoreModel = types
  .model('AuthenticationStore')
  .props({
    authToken: types.maybe(types.string),
    authEmail: '',
  })
  .views(store => ({
    get isAuthenticated() {
      return !!store.authToken;
    },
    get validationError() {
      if (store.authEmail.length === 0) return 'O e-mail não pode estar vazio';
      if (store.authEmail.length < 6) return 'Deve ter no mínimo 6 caracteres';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.authEmail)) return 'Deve ser um e-mail válido';
      return '';
    },
  }))
  .actions(store => ({
    setAuthToken(value?: string) {
      store.authToken = value;
    },
    setAuthEmail(value: string) {
      store.authEmail = value.replace(/ /g, '');
    },
    logout() {
      store.authToken = undefined;
      store.authEmail = '';
    },
  }));

export type AuthenticationStore = Instance<typeof AuthenticationStoreModel>;
export type AuthenticationStoreSnapshot = SnapshotOut<typeof AuthenticationStoreModel>;

// @demo remove-file
