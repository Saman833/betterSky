import toWeather from "./toWeather"

describe("Weather > toWeather", () => {
  it("works with 0", () => {
    expect(toWeather(0)).toEqual("Clear")
  })

  it("works with -1", () => {
    expect(toWeather(-1)).toEqual("Unknown")
  })
})
