import { FileModel } from "./File"

test("can be created", () => {
  const instance = FileModel.create({})

  expect(instance).toBeTruthy()
})
