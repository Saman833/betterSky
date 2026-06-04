import { render } from "@testing-library/react-native"

import { Forecast } from "./Forecast"

jest.mock("./weatherApi", () => ({
  fetchForecast: jest.fn(async () => [
    {
      day: "2026-06-04",
      temperatureMax: 24.1,
      temperatureMin: 18.2,
      condition: "Clear",
    },
  ]),
}))

describe("Weather > Forecast", () => {
  it("works", async () => {
    const { findAllByText } = render(
      <Forecast
        location={{
          name: "Barcelona",
          latitude: 41.385063,
          longitude: 2.173404,
        }}
      />,
    )

    await findAllByText(/[0-9]\.[0-9] C$/)
  })
})
