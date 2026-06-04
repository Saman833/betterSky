import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typegraphy"
import { subscribeDeviceMotion } from "#shared/sensors"

type MotionValues = {
  x: string
  y: string
  z: string
}

const App: React.FC = () => {
  const [motion, setMotion] = useState<MotionValues | null>(null)

  useEffect(
    () =>
      subscribeDeviceMotion((measurement) => {
        setMotion({
          x: measurement.accelerationIncludingGravity.x.toFixed(8),
          y: measurement.accelerationIncludingGravity.y.toFixed(8),
          z: measurement.accelerationIncludingGravity.z.toFixed(8),
        })
      }),
    [],
  )

  return (
    <>
      <View style={styles.container}>
        <Typography variant="title">Device Motion</Typography>
        <Typography variant="label">x: {motion?.x ?? "--"}</Typography>
        <Typography variant="label">y: {motion?.y ?? "--"}</Typography>
        <Typography variant="label">z: {motion?.z ?? "--"}</Typography>
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
