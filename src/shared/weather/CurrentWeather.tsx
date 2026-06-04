import { useEffect, useState } from "react"
import { Pressable, StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typegraphy"
import { spacing } from "#design/foundations"
import { hapticImpact } from "#shared/haptics"

import { type WeatherLocation } from "./types"
import { fetchCurrentWeather, type CurrentWeatherData } from "./weatherApi"

export const CurrentWeather: React.FC<{
  location?: WeatherLocation
}> = ({ location }) => {
  const [data, setData] = useState<CurrentWeatherData>()

  useEffect(() => {
    void (async () => {
      if (!location) return

      setData(await fetchCurrentWeather(location))
    })()
  }, [location])

  return (
    <Card>
      <Pressable onPress={() => hapticImpact()}>
        <View style={styles.current}>
          <Typography variant="title">
            {data?.temperature.toFixed(1) ?? "--"} C
          </Typography>
          <Typography variant="muted">{location?.name ?? "--"}</Typography>
          <Typography variant="label">{data?.condition ?? "--"}</Typography>
        </View>
      </Pressable>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Typography variant="large">
            {data?.wind.toFixed(0) ?? "--"} km/h
          </Typography>
          <Typography variant="label">Wind</Typography>
        </View>
        <View style={styles.stat}>
          <Typography variant="large">
            {data?.humidity.toFixed(0) ?? "--"}%
          </Typography>
          <Typography variant="label">Humidity</Typography>
        </View>
        <View style={styles.stat}>
          <Typography variant="large">{data?.uv.toFixed(0) ?? "--"}</Typography>
          <Typography variant="label">UV</Typography>
        </View>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  current: {
    alignItems: "center",
    marginBottom: spacing.between,
  },
  stats: {
    flexDirection: "row",
  },
  stat: {
    flex: 1,
    alignItems: "center",
  },
})
