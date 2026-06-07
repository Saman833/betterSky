import ExpoConstants, { ExecutionEnvironment } from "expo-constants"
import { Platform } from "react-native"

let configured: boolean | null = null

function isExpoGo(): boolean {
  return ExpoConstants.executionEnvironment === ExecutionEnvironment.StoreClient
}

export async function configureNotifications(): Promise<boolean> {
  if (configured !== null) return configured

  if (isExpoGo()) {
    console.warn(
      "Notification demos require a development build in Expo SDK 53+. Settings still work in Expo Go.",
    )
    configured = false
    return false
  }

  const Notifications = await import("expo-notifications")

  const { status } = await Notifications.requestPermissionsAsync()
  if (status !== Notifications.PermissionStatus.GRANTED) {
    console.warn("Permission to show notifications was denied")

    configured = false
    return false
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => {
      return {
        shouldPlaySound: false,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }
    },
  })

  configured = true
  return true
}

export async function createNotification({
  title,
  short,
  body,
}: {
  title: string
  short?: string
  body: string
}): Promise<void> {
  const ready = await configureNotifications()
  if (!ready) return

  const Notifications = await import("expo-notifications")

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      subtitle: Platform.select({ android: short }) ?? "",
      body,
    },
    trigger: null,
  })
}
