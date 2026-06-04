import { PermissionStatus } from "expo-modules-core"
import { type DeviceMotionMeasurement, DeviceMotion } from "expo-sensors"

let configured: boolean | null = null

export async function configureDeviceMotion(): Promise<boolean> {
  if (configured !== null) return configured

  const { status } = await DeviceMotion.getPermissionsAsync()
  if (status !== PermissionStatus.GRANTED) {
    console.warn("Permission to access DeviceMotion was denied")

    configured = false
    return false
  }

  configured = true
  return true
}

export function subscribeDeviceMotion(
  callback: (motion: DeviceMotionMeasurement) => void,
): () => void {
  void configureDeviceMotion()

  const subscription = DeviceMotion.addListener((motion) => {
    callback(motion)
  })

  return () => {
    subscription.remove()
  }
}
