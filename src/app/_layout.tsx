import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"

import { SettingsProvider } from "#shared/settings"

const Layout: React.FC = () => {
  return (
    <SettingsProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>

      <StatusBar style="auto" />
    </SettingsProvider>
  )
}

export default Layout
