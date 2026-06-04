import { Stack, useLocalSearchParams } from "expo-router"
import { Pressable, StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typegraphy"
import { spacing } from "#design/foundations"
import { useFavorites } from "#shared/favorites"
import { findCityByName } from "#shared/suggestions"
import { CurrentWeather, Forecast } from "#shared/weather"

const App: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>()

  const { favorites, addFavorite, isFavorite } = useFavorites()
  const location = id ? findCityByName(id, favorites) : undefined

  return (
    <>
      <Stack.Screen options={{ title: location?.name ?? "City" }} />

      <View style={styles.container}>
        <CurrentWeather location={location} />
        <Forecast location={location} />

        {location && !isFavorite(location.name) ? (
          <Pressable
            style={styles.action}
            onPress={() => void addFavorite(location)}
          >
            <Typography variant="label">Add to Favorites</Typography>
          </Pressable>
        ) : null}
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
  action: {
    marginTop: spacing.between,
  },
})
