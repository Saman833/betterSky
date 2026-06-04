import { Pressable, StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typegraphy"
import { spacing } from "#design/foundations"
import { useFavorites } from "#shared/favorites"
import { CurrentWeather, Forecast, useCurrentLocation } from "#shared/weather"

const App: React.FC = () => {
  const location = useCurrentLocation()
  const { addFavorite, isFavorite } = useFavorites()

  return (
    <>
      <View style={styles.container}>
        <CurrentWeather location={location} />
        <Forecast location={location} />

        {location ? (
          isFavorite(location.name) ? (
            <Typography variant="muted">Saved to Favorites</Typography>
          ) : (
            <Pressable
              style={styles.action}
              onPress={() => void addFavorite(location)}
            >
              <Typography variant="label">Add to Favorites</Typography>
            </Pressable>
          )
        ) : null}

        <Typography href="/temp">Go to Temporary</Typography>
      </View>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.between,
  },
  action: {
    marginTop: spacing.between,
  },
})
