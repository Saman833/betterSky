import { findCityByName } from "./findCityByName"

describe("Suggestions > findCityByName", () => {
  it("finds a favorite city first", () => {
    const barcelona = {
      name: "Barcelona",
      latitude: 41.385063,
      longitude: 2.173404,
    }

    expect(findCityByName("Barcelona", [barcelona])).toEqual(barcelona)
  })

  it("finds a catalog city when not favorited", () => {
    const tokyo = findCityByName("Tokyo")

    expect(tokyo?.name).toBe("Tokyo")
  })
})
