/* eslint-disable @typescript-eslint/no-unsafe-argument */
import config from "@christopherjbaker/eslint-config/react-strict"
import { defineConfig, globalIgnores } from "eslint/config"

import pluginExpo from "eslint-plugin-expo"

export default defineConfig(
  globalIgnores(["dist/", "web-build/", "coverage/"]),
  config,
  {
    plugins: {
      expo: pluginExpo,
    },
    rules: {
      "jest/expect-expect": "off",
      "expo/use-dom-exports": "error",
      "expo/no-env-var-destructuring": "error",
      "expo/no-dynamic-env-var": "error",
      "expo/prefer-box-shadow": "warn",

      // Prevent use of CJS `require` syntax unless importing assets to align with Metro behavior.
      "@typescript-eslint/no-require-imports": [
        "warn",
        {
          allow: [
            "\\.(aac|aiff|avif|bmp|caf|db|gif|heic|html|jpeg|jpg|json|m4a|m4v|mov|mp3|mp4|mpeg|mpg|otf|pdf|png|psd|svg|ttf|wav|webm|webp|xml|yaml|yml|zip)$",
          ],
        },
      ],
    },
  },
  {
    // configs overrides, if need
  },
)
