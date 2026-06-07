import { type KnipConfiguration } from "knip"

const config: KnipConfiguration = {
  $schema: "https://unpkg.com/knip@6/schema.json",
  ignoreBinaries: ["eas", "expo-doctor"],
  ignoreDependencies: ["expo-updates"],
  ignoreIssues: {
    "src/shared/**": ["exports", "types"],
  },
}

export default config
