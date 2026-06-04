import { StyleSheet, View } from "react-native"

import TextField from "#design/elements/fields/Text"
import FormGroup from "#design/elements/FormGroup"
import Typography from "#design/elements/Typegraphy"
import { useSettings, useSettingsSetter } from "#shared/settings"

const App: React.FC = () => {
  const settings = useSettings()
  const setSettings = useSettingsSetter()

  return (
    <>
      <View style={styles.container}>
        <Typography variant="title">Settings</Typography>

        <FormGroup label="Home Name">
          <TextField
            onChange={(value) =>
              setSettings({
                ...settings,
                home: {
                  ...settings.home,
                  name: value,
                },
              })
            }
            value={settings.home.name}
          />
        </FormGroup>
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
