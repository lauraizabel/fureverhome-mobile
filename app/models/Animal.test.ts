import { AnimalModel } from "./Animal"

test("can be created", () => {
  const instance = AnimalModel.create({})

  expect(instance).toBeTruthy()
})
