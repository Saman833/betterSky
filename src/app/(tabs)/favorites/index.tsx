import { Stack } from "expo-router"
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typegraphy"
import { spacing } from "#design/foundations"
import { useFavorites } from "#shared/favorites"
import { useSuggestions } from "#shared/suggestions"

const App: React.FC = () => {
  const { favorites, isReady, removeFavorite, addFavorite, isFavorite } =
    useFavorites()
  const { suggestions, loading } = useSuggestions(favorites)

  return (
    <>
      <Stack.Screen options={{ title: "Favorites" }} />

      <ScrollView contentContainerStyle={styles.container}>
        <Typography variant="title">Favorites</Typography>

        {!isReady ? (
          <ActivityIndicator style={styles.loader} />
        ) : favorites.length === 0 ? (
          <Typography variant="muted">
            No favorites yet. Add a city from Home to get suggestions.
          </Typography>
        ) : (
          favorites.map((favorite) => (
            <Card key={favorite.name} style={styles.card}>
              <View style={styles.row}>
                <Typography href={`/favorites/${favorite.name}`}>
                  {favorite.name}
                </Typography>
                <Pressable onPress={() => void removeFavorite(favorite.name)}>
                  <Typography variant="label">Remove</Typography>
                </Pressable>
              </View>
            </Card>
          ))
        )}

        <Typography variant="title" style={styles.sectionTitle}>
          Suggested for you
        </Typography>

        {favorites.length === 0 ? (
          <Typography variant="muted">
            Suggestions appear after you save a favorite city.
          </Typography>
        ) : loading ? (
          <ActivityIndicator style={styles.loader} />
        ) : (
          suggestions.map((suggestion) => (
            <Card key={suggestion.location.name} style={styles.card}>
              <Typography variant="large">
                {suggestion.location.name}
              </Typography>
              <Typography variant="muted">
                {suggestion.temperature.toFixed(1)} C · {suggestion.condition}
              </Typography>
              <Typography variant="label">
                Similar to {suggestion.similarTo}
              </Typography>
              <View style={styles.actions}>
                <Typography href={`/favorites/${suggestion.location.name}`}>
                  View
                </Typography>
                {isFavorite(suggestion.location.name) ? (
                  <Typography variant="muted">Saved</Typography>
                ) : (
                  <Pressable
                    onPress={() => void addFavorite(suggestion.location)}
                  >
                    <Typography variant="label">Add</Typography>
                  </Pressable>
                )}
              </View>
            </Card>
          ))
        )}
      </ScrollView>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: spacing.between,
    gap: spacing.between,
  },
  sectionTitle: {
    marginTop: spacing.between,
  },
  card: {
    width: "100%",
    alignItems: "flex-start",
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actions: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.inside,
  },
  loader: {
    marginVertical: spacing.between,
  },
})
