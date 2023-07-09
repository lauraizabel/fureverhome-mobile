import { UserAddressModel } from "./UserAddress"

test("can be created", () => {
  const instance = UserAddressModel.create({})

  expect(instance).toBeTruthy()
})
