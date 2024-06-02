import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import CheckBox from "../CheckBox"

describe("CheckBox", () => {
  test("renders correctly", () => {
    const { container } = render(<CheckBox />)
    expect(container).toMatchSnapshot()
    expect(container.firstChild).toHaveAttribute("type", "checkbox")
  })

  test("renders with custom className", () => {
    const { container } = render(
      <CheckBox className="size-10 px-4 checked:bg-pink-500" />
    )
    expect(container).toMatchSnapshot()
  })

  test("renders with additional props", () => {
    const { container } = render(
      <CheckBox aria-label="checkbox" defaultChecked disabled />
    )
    expect(container).toMatchSnapshot()
  })

  it("should change the checked state when clicked", async () => {
    render(<CheckBox />)
    const checkbox = screen.getByRole("checkbox")
    expect(checkbox).not.toBeChecked()
    await userEvent.click(checkbox)
    expect(checkbox).toBeChecked()
  })
})
