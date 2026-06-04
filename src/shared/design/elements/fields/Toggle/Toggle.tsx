import { type SwitchProps, StyleSheet, Switch } from "react-native"

export type ToggleFieldProps = {
  // variant: "" | ""
  onChange: (value: boolean) => void
  value: boolean
} & Omit<SwitchProps, "onChange" | "value" | "onValueChange">

const ToggleField: React.FC<ToggleFieldProps> = ({
  onChange,
  value,
  style,
  ...props
}) => {
  return (
    <Switch
      onValueChange={onChange}
      value={value}
      style={[styles.input, style]}
      {...props}
    />
  )
}

export default ToggleField

const styles = StyleSheet.create({
  input: {
    // borderWidth: 1,
    // padding: 10,
    // fontSize: 16,
    // lineHeight: 16,
  },
})
