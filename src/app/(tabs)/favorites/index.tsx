import { Stack } from "expo-router"
import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typegraphy"
import { useFavorites } from "#shared/favorites"

const App: React.FC = () => {
  const [favorites] = useFavorites()

  return (
    <>
      <Stack.Screen options={{ title: "Favorites" }} />

      <View style={styles.container}>
        {favorites.map((favorite) => (
          <Typography key={favorite.name} href={`/favorites/${favorite.name}`}>
            {favorite.name}
          </Typography>
        ))}
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
