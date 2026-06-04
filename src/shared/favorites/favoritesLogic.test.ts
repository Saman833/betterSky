import {
  addFavoriteToList,
  isFavorite,
  removeFavoriteFromList,
} from "./favoritesLogic"

describe("Favorites > favoritesLogic", () => {
  const barcelona = {
    name: "Barcelona",
    latitude: 41.385063,
    longitude: 2.173404,
  }

  const reno = {
    name: "Reno",
    latitude: 39.5299,
    longitude: 119.8143,
  }

  it("adds a favorite without duplicates", () => {
    const favorites = addFavoriteToList([], barcelona)

    expect(favorites).toEqual([barcelona])
    expect(addFavoriteToList(favorites, barcelona)).toEqual([barcelona])
  })

  it("removes a favorite by name", () => {
    const favorites = addFavoriteToList([barcelona], reno)

    expect(removeFavoriteFromList(favorites, "Barcelona")).toEqual([reno])
  })

  it("checks if a city is favorited", () => {
    expect(isFavorite([barcelona], "Barcelona")).toBe(true)
    expect(isFavorite([barcelona], "Reno")).toBe(false)
  })
})
