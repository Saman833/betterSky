import * as Haptics from "expo-haptics"
import { Platform } from "react-native"

export async function hapticImpact(): Promise<void> {
  if (Platform.OS === "android") {
    await Haptics.performAndroidHapticsAsync(
      Haptics.AndroidHaptics.Keyboard_Tap,
    )
  } else {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  }
}
