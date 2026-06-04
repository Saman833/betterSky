import { render } from "@testing-library/react-native"

import { CurrentWeather } from "./CurrentWeather"

jest.mock("./weatherApi", () => ({
  fetchCurrentWeather: jest.fn(async () => ({
    condition: "Clear",
    temperature: 22.5,
    wind: 8,
    humidity: 62,
    uv: 4,
  })),
}))

describe("Weather > CurrentWeather", () => {
  it("works", async () => {
    const { findByText } = render(
      <CurrentWeather
        location={{
          name: "Barcelona",
          latitude: 41.385063,
          longitude: 2.173404,
        }}
      />,
    )

    await findByText("Barcelona")
  })
})
