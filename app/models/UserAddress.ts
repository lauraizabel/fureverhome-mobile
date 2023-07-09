import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { UserModel } from 'app/models/User';
import { withSetPropAction } from './helpers/withSetPropAction';

/**
 * Model description here for TypeScript hints.
 */
export const UserAddressModel = types
  .model('UserAddress', {
    id: types.identifierNumber,
    user: types.reference(types.late(() => UserModel)),
    street: types.string,
    state: types.string,
    neighborhood: types.string,
    number: types.maybeNull(types.string),
    updatedAt: types.Date,
    createdAt: types.Date,
  })
  .props({})
  .actions(withSetPropAction)
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})); // eslint-disable-line @typescript-eslint/no-unused-vars

export type UserAddress = Instance<typeof UserAddressModel>;
export type UserAddressSnapshotOut = SnapshotOut<typeof UserAddressModel>;
export type UserAddressSnapshotIn = SnapshotIn<typeof UserAddressModel>;
export const createUserAddressDefaultModel = () => types.optional(UserAddressModel, {});
