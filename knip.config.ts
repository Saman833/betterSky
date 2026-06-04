import { type KnipConfiguration } from "knip"

const config: KnipConfiguration = {
  $schema: "https://unpkg.com/knip@6/schema.json",
  ignoreFiles: ["dist/**", "web-build/**", "coverage/**"],
  ignoreDependencies: ["expo-asset", "expo-modules-core", "expo-updates"],
  ignoreIssues: {
    "src/shared/**": ["exports", "types"],
  },
}

export default config
