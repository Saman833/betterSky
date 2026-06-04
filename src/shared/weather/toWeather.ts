const codeMap = {
  0: "Clear",

  1: "Cloudy", // Mainly Clear
  2: "Cloudy", // Partly Cloudy
  3: "Overcast", // Overcast

  45: "Fog", // Fog
  48: "Fog", // Depositing Rime Fog

  51: "Light Rain", // Drizzle: Light
  53: "Moderate Rain", // Drizzle: Moderate
  55: "Heavy Rain", // Drizzle: Heavy
  61: "Light Rain", // Rain: Light
  63: "Moderate Rain", // Rain: Moderate
  65: "Heavy Rain", // Rain: Heavy
  80: "Light Rain", // Rain Showers: Light
  81: "Moderate Rain", // Rain Showers: Moderate
  82: "Heavy Rain", // Rain Showers: Heavy

  56: "Light Rain", // Freezing Drizzle: Light
  57: "Heavy Rain", // Freezing Drizzle: Heavy
  66: "Light Rain", // Freezing  Rain: Light
  67: "Heavy Rain", // Freezing Rain: Heavy

  71: "Light Snow", // Snow: Light
  73: "Moderate Snow", // Snow: Moderate
  75: "Heavy Snow", // Snow: Heavy
  77: "Light Snow", // Snow Grains
  85: "Light Snow", // Snow Showers: Light
  86: "Heavy Snow", // Snow Showers: Heavy

  95: "Thunderstorm", // Thunderstorm: Slight or moderate
  96: "Thunderstorm", // Thunderstorm with slight and heavy hail
  99: "Thunderstorm", // Thunderstorm with slight and heavy hail
} as const

export type WeatherCode = keyof typeof codeMap
export type Weather = (typeof codeMap)[WeatherCode] | "Unknown"

export default function toWeather(input: number): Weather {
  if (input in codeMap) {
    return codeMap[input as WeatherCode]
  }

  return "Unknown"
}
