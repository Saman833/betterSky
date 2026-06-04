import { Stack, useLocalSearchParams } from "expo-router"
import { StyleSheet, View } from "react-native"

import { useFavorites } from "#shared/favorites"
import { CurrentWeather, Forecast } from "#shared/weather"

const App: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>()

  const [favorites] = useFavorites()
  const location = favorites.find((favorite) => favorite.name === id)

  return (
    <>
      <Stack.Screen
        options={{ title: `Favorite: ${location?.name ?? "--"}` }}
      />

      <View style={styles.container}>
        <CurrentWeather location={location} />
        <Forecast location={location} />
      </View>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
