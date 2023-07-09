import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { UserAddressModel } from 'app/models/UserAddress';
import { AnimalModel } from 'app/models/Animal';
import { FileModel } from 'app/models/File';
import { withSetPropAction } from './helpers/withSetPropAction';

/**
 * Model description here for TypeScript hints.
 */
export const UserModel = types
  .model('User', {
    id: types.identifierNumber,
    firstName: types.string,
    lastName: types.string,
    password: types.string,
    email: types.string,
    job: types.maybeNull(types.string),
    cpf: types.maybeNull(types.string),
    cnpj: types.maybeNull(types.string),
    picture: types.maybe(types.reference(types.late(() => FileModel))),
    type: types.enumeration('UserType', [
      /* insira os valores possíveis do enum UserType aqui */
    ]),
    userAddress: types.late(() => UserAddressModel),
    animal: types.array(types.reference(AnimalModel)),
    updatedAt: types.Date,
    createdAt: types.Date,
  })
  .props({})
  .actions(withSetPropAction)
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})); // eslint-disable-line @typescript-eslint/no-unused-vars

export default User;
export type User = Instance<typeof UserModel>;
export type UserSnapshotOut = SnapshotOut<typeof UserModel>;
export type UserSnapshotIn = SnapshotIn<typeof UserModel>;
export const createUserDefaultModel = () => types.optional(UserModel, {});
