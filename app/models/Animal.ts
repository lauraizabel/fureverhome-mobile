import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { UserModel } from 'app/models/User';
import { FileModel } from 'app/models/File';
import { withSetPropAction } from './helpers/withSetPropAction';

/**
 * Model description here for TypeScript hints.
 */
export const AnimalModel = types
  .model('Animal', {
    id: types.identifierNumber,
    type: types.enumeration('AnimalType', []),
    color: types.enumeration('CommonColors', []),
    description: types.string,
    name: types.maybeNull(types.string),
    dewormed: types.enumeration('AnimalDewormed', []),
    user: types.reference(types.late(() => UserModel)),
    files: types.array(types.reference(FileModel)),
    updatedAt: types.Date,
    createdAt: types.Date,
  })
  .props({})
  .actions(withSetPropAction)
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})); // eslint-disable-line @typescript-eslint/no-unused-vars

export type Animal = Instance<typeof AnimalModel>;
export type AnimalSnapshotOut = SnapshotOut<typeof AnimalModel>;
export type AnimalSnapshotIn = SnapshotIn<typeof AnimalModel>;
export const createAnimalDefaultModel = () => types.optional(AnimalModel, {});
