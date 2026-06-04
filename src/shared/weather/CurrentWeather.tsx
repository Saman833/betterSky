import { useEffect, useState } from "react"
import { Pressable, StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typegraphy"
import { spacing } from "#design/foundations"
import { hapticImpact } from "#shared/haptics"

import toWeather, { type Weather } from "./toWeather"
import { type WeatherLocation } from "./types"

export const CurrentWeather: React.FC<{
  location?: WeatherLocation
}> = ({ location }) => {
  const [data, setData] = useState<{
    condition: Weather
    temperature: number
    wind: number
    humidity: number
    uv: number
  }>()

  useEffect(() => {
    void (async () => {
      if (!location) return

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,is_day,weather_code,wind_speed_10m,relative_humidity_2m,uv_index`,
      )
      const data = (await response.json()) as {
        current: {
          weather_code: number
          temperature_2m: number
          wind_speed_10m: number
          relative_humidity_2m: number
          uv_index: number
        }
      }

      setData({
        condition: toWeather(data.current.weather_code),
        temperature: data.current.temperature_2m,
        wind: data.current.wind_speed_10m,
        humidity: data.current.relative_humidity_2m,
        uv: data.current.uv_index,
      })
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
