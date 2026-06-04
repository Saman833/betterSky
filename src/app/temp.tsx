import { Stack } from "expo-router"
import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typegraphy"

const App: React.FC = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Temporary" }} />

      <View style={styles.container}>
        <Typography variant="title">Temporary</Typography>
        <Typography href="/">Go Home</Typography>
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
