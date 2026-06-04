import { useEffect } from "react"
import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typegraphy"
import { subscribeDeviceMotion } from "#shared/sensors"

const App: React.FC = () => {
  useEffect(
    () =>
      subscribeDeviceMotion((motion) => {
        console.log({
          x: motion.accelerationIncludingGravity.x.toFixed(8),
          y: motion.accelerationIncludingGravity.y.toFixed(8),
          z: motion.accelerationIncludingGravity.z.toFixed(8),
        })
      }),
    [],
  )

  return (
    <>
      <View style={styles.container}>
        <Typography variant="title">Device Motion</Typography>
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
