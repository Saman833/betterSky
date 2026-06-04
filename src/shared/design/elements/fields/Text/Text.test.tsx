import { render, userEvent } from "@testing-library/react-native"

import FormGroup from "#design/elements/FormGroup"

import Text from "./Text"

describe("Design > Elements > Fields > Text", () => {
  it("works", () => {
    render(<Text onChange={() => undefined} value="" />)
  })

  it("handles keyboard", async () => {
    const callback = jest.fn()

    const { getByDisplayValue } = render(
      <Text onChange={callback} value="Value" />,
    )

    const value = getByDisplayValue("Value")

    await userEvent.type(value, "hello")
    expect(callback).toHaveBeenCalledTimes(5)
    expect(callback).toHaveBeenCalledWith("Valueh")
    expect(callback).toHaveBeenCalledWith("Valuee")
    expect(callback).toHaveBeenCalledWith("Valuel")
    expect(callback).toHaveBeenCalledWith("Valuel")
    expect(callback).toHaveBeenCalledWith("Valueo")
  })

  it("works with FormGroup", async () => {
    const callback = jest.fn()

    const { getByText, getByDisplayValue } = render(
      <FormGroup label="Text Field">
        <Text onChange={callback} value="Value" />
      </FormGroup>,
    )

    getByText("Text Field")
    getByDisplayValue("Value")
  })
})
