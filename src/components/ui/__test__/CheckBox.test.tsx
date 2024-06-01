import { render } from "@testing-library/react";
import CheckBox from "../CheckBox";

describe("CheckBox", () => {
  test("renders correctly", () => {
    const { container } = render(<CheckBox />);
    expect(container).toMatchSnapshot();
    expect(container.firstChild).toHaveAttribute("type", "checkbox");
  });

  test("renders with custom className", () => {
    const { container } = render(<CheckBox className="h-10 w-10 px-4 custom-class" />);
    expect(container).toMatchSnapshot();
  });

  test("renders with additional props", () => {
    const { container } = render(
      <CheckBox aria-label="checkbox" defaultChecked type="button"/>
    );
    expect(container).toMatchSnapshot();
  });
});
