import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

export type Settings = {
  home: {
    name: string
  }
  notifications: {
    enabled: boolean
    favorites: boolean
  }
}

const defaultSettings = {
  home: {
    name: "Home",
  },
  notifications: {
    enabled: false,
    favorites: true,
  },
}

const STORAGE_KEY = "settings"

const Context = createContext<
  | {
      set: (settings: Settings) => void
      settings: Settings
    }
  | undefined
>(undefined)

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings)

  useEffect(() => {
    void AsyncStorage.getItem(STORAGE_KEY).then((cached) => {
      if (!cached) return

      const settings = JSON.parse(cached) as Settings
      setSettings(settings)
    })
  }, [])

  const value = useMemo(
    () => ({
      set: (settings: Settings) => {
        setSettings(settings)
        void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
      },
      settings,
    }),
    [settings],
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useSettings(): Settings {
  const context = useContext(Context)
  if (!context) throw new Error("Missing SettingsProvider.")

  return context.settings
}

export function useSettingsSetter(): (settings: Settings) => void {
  const context = useContext(Context)
  if (!context) throw new Error("Missing SettingsProvider.")

  return context.set
}
