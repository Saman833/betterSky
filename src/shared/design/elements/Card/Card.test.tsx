import { render } from "@testing-library/react-native"
import { Text } from "react-native"

import Card from "./Card"

describe("Design > Elements > Card", () => {
  it("works", () => {
    render(
      <Card>
        <Text>Hello</Text>
      </Card>,
    )
  })
})
