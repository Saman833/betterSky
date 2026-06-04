import { render } from "@testing-library/react-native"

import { Forecast } from "./Forecast"

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
