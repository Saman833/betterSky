import * as Location from "expo-location"

export type DeviceLocation = {
  latitude: number
  longitude: number
}

let configured: boolean | null = null

export async function configureLocation(): Promise<boolean> {
  if (configured !== null) return configured

  const { status } = await Location.requestForegroundPermissionsAsync()
  if (status !== Location.PermissionStatus.GRANTED) {
    console.warn("Permission to access location was denied")

    configured = false
    return false
  }

  configured = true
  return true
}

export async function getLocation(): Promise<DeviceLocation | undefined> {
  await configureLocation()

  try {
    const location = await Location.getCurrentPositionAsync()

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    }
  } catch (error) {
    console.error(error)
    return undefined
  }
}

export async function lookupLocation(
  type: "country" | "city" | "address",
  coords: DeviceLocation,
): Promise<string> {
  return "Here"
}
