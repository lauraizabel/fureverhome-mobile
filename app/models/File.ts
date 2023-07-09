import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { UserModel } from 'app/models/User';
import { AnimalModel } from 'app/models/Animal';
import { withSetPropAction } from './helpers/withSetPropAction';

/**
 * Model description here for TypeScript hints.
 */
export const FileModel = types
  .model('File', {
    id: types.identifierNumber,
    url: types.string,
    fileId: types.string,
    updatedAt: types.Date,
    createdAt: types.Date,
    user: types.maybe(types.reference(types.late(() => UserModel))),
    animal: types.maybe(types.reference(types.late(() => AnimalModel))),
  })
  .props({})
  .actions(withSetPropAction)
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})); // eslint-disable-line @typescript-eslint/no-unused-vars

export type File = Instance<typeof FileModel>;
export type FileSnapshotOut = SnapshotOut<typeof FileModel>;
export type FileSnapshotIn = SnapshotIn<typeof FileModel>;
export const createFileDefaultModel = () => types.optional(FileModel, {});
