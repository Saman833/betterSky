import { render } from "@testing-library/react-native"

import { CurrentWeather } from "./CurrentWeather"

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
