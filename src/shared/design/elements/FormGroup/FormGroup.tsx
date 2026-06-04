import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typegraphy"

export type FormGroupProps = {
  label: string
  children: React.ReactNode
}

const FormGroup: React.FC<FormGroupProps> = ({ label, children }) => {
  return (
    <View style={styles.group}>
      <Typography style={styles.label}>{label}</Typography>
      <View style={styles.value}>{children}</View>
    </View>
  )
}

export default FormGroup

const styles = StyleSheet.create({
  group: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    paddingHorizontal: 12,
  },
  label: {
    flex: 1,
  },
  value: {
    flex: 1,
  },
})
