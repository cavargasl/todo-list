import { render } from "@testing-library/react"

import Button from "../Button"

describe("Button", () => {
  it("renders correctly with default props", () => {
    const { container } = render(<Button />)
    expect(container).toMatchSnapshot()
  })

  it("renders correctly with custom className", () => {
    const { container } = render(
      <Button className="font-extrabold text-pink-600" />
    )
    expect(container).toMatchSnapshot()
  })

  it("renders correctly with variant 'ghost'", () => {
    const { container } = render(<Button variant="ghost" />)
    expect(container).toMatchSnapshot()
  })

  it("renders correctly with size 'small'", () => {
    const { container } = render(<Button size="small" />)
    expect(container).toMatchSnapshot()
  })

  it("renders correctly with size 'icon'", () => {
    const { container } = render(<Button size="icon" />)
    expect(container).toMatchSnapshot()
  })

  it("renders correctly with children", () => {
    const { container } = render(<Button>Button</Button>)
    expect(container).toMatchSnapshot()
  })

  it("renders correctly with disabled prop", () => {
    const { container } = render(<Button disabled />)
    expect(container).toMatchSnapshot()
  })

  it("renders correctly with variant 'ghost' and size 'small'", () => {
    const { container } = render(<Button variant="ghost" size="small" />)
    expect(container).toMatchSnapshot()
  })

  it("renders correctly with variant 'ghost' and size 'icon'", () => {
    const { container } = render(<Button variant="ghost" size="icon" />)
    expect(container).toMatchSnapshot()
  })

  it("renders correctly with variant 'ghost', size 'default', and disabled", () => {
    const { container } = render(<Button variant="ghost" disabled />)
    expect(container).toMatchSnapshot()
  })
})
