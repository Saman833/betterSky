import { render, userEvent } from "@testing-library/react-native"

import FormGroup from "#design/elements/FormGroup"

import Toggle from "./Toggle"

describe("Design > Elements > Fields > Toggle", () => {
  it("works", () => {
    render(<Toggle onChange={() => undefined} value={true} />)
  })

  it("handles keyboard", async () => {
    const { getByRole } = render(
      <Toggle onChange={() => undefined} value={true} />,
    )

    const value = getByRole("switch")
    await userEvent.press(value)
  })

  it("works with FormGroup", () => {
    const { getByText, getByRole } = render(
      <FormGroup label="Toggle Field">
        <Toggle onChange={() => undefined} value={true} />
      </FormGroup>,
    )

    getByText("Toggle Field")
    getByRole("switch")
  })
})
