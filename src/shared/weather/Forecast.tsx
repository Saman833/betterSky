import { useEffect, useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typegraphy"
import { spacing } from "#design/foundations"

import toWeather, { type Weather } from "./toWeather"
import { type WeatherLocation } from "./types"

export const Forecast: React.FC<{
  location?: WeatherLocation
}> = ({ location }) => {
  const [data, setData] = useState<
    Array<{
      day: string
      temperatureMax: number
      temperatureMin: number
      condition: Weather
    }>
  >()

  useEffect(() => {
    void (async () => {
      if (!location) return

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code`,
      )
      const data = (await response.json()) as {
        daily: {
          time: string[]
          temperature_2m_max: number[]
          temperature_2m_min: number[]
          weather_code: number[]
        }
      }

      const forecast = []
      for (let i = 0; i < data.daily.time.length; i++) {
        forecast.push({
          day: data.daily.time[i],
          temperatureMax: data.daily.temperature_2m_max[i],
          temperatureMin: data.daily.temperature_2m_min[i],
          condition: toWeather(data.daily.weather_code[i]),
        })
      }

      setData(forecast)
    })()
  }, [location])

  return (
    <Card>
      <ScrollView horizontal style={styles.days}>
        {data?.map(({ day, temperatureMax, temperatureMin, condition }) => (
          <View key={day} style={styles.day}>
            <Typography variant="large">
              {temperatureMax.toFixed(1)} C
            </Typography>
            <Typography variant="muted">
              {temperatureMin.toFixed(1)} C
            </Typography>
            <Typography variant="label">{condition}</Typography>
          </View>
        ))}
      </ScrollView>
    </Card>
  )
}

const styles = StyleSheet.create({
  days: { flexGrow: 0, flexDirection: "row" },
  day: { flex: 1, alignItems: "center", marginHorizontal: spacing.between },
})
