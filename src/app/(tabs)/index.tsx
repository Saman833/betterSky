import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typegraphy"
import { CurrentWeather, Forecast, useCurrentLocation } from "#shared/weather"

const App: React.FC = () => {
  const location = useCurrentLocation()

  return (
    <>
      <View style={styles.container}>
        <CurrentWeather location={location} />
        <Forecast location={location} />

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
  },
})
