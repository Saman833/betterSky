import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"

import { getLocation, lookupLocation } from "#shared/location"

import { type WeatherLocation } from "./types"

const STORAGE_KEY = "cached-location"

export function useCurrentLocation(): WeatherLocation | undefined {
  const [location, setLocation] = useState<WeatherLocation>()

  useEffect(() => {
    void (async () => {
      const currentLocation = await getLocation()
      if (currentLocation) {
        const location: WeatherLocation = {
          name: await lookupLocation("city", currentLocation),
          ...currentLocation,
        }

        setLocation(location)
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(location))
        return
      }

      const cachedLocation = await AsyncStorage.getItem(STORAGE_KEY)
      if (cachedLocation) {
        const location = JSON.parse(cachedLocation) as WeatherLocation
        setLocation(location)
        return
      }

      setLocation({
        name: "Barcelona",
        latitude: 41.385063,
        longitude: 2.173404,
      })
    })()
  }, [])

  return location
}
