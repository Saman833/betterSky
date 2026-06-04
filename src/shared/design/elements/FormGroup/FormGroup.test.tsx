import { render } from "@testing-library/react-native"
import { Text } from "react-native"

import FormGroup from "./FormGroup"

describe("Design > Elements > FormGroup", () => {
  it("renders the label", () => {
    const { getByText } = render(
      <FormGroup label="Text Field">
        <Text>Value</Text>
      </FormGroup>,
    )

    getByText("Text Field")
    getByText("Value")
  })
})
