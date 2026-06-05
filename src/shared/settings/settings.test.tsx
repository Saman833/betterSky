import { render } from "@testing-library/react-native"
import { Text } from "react-native"

import { SettingsProvider } from "./settings"

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(async () => null),
  setItem: jest.fn(async () => undefined),
}))

describe("Settings > SettingsProvider", () => {
  it("works", () => {
    render(
      <SettingsProvider>
        <Text>Settings</Text>
      </SettingsProvider>,
    )
  })
})
