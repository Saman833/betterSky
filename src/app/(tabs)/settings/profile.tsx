import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typegraphy"

const App: React.FC = () => {
  return (
    <>
      <View style={styles.container}>
        <Typography variant="title">Profile</Typography>
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
