import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "../Input";

describe("Input component", () => {
  test("renders correctly", () => {
    const { container } = render(<Input />);
    expect(container).toMatchSnapshot();
  });

  test("handles onChange event correctly", async () => {
    render(<Input placeholder="Typing here" />);
    const inputElement = screen.getByPlaceholderText("Typing here");
    await userEvent.type(inputElement, "New Task");
    expect(inputElement).toHaveValue("New Task");
  });

  test("renders with custom className and disabled", () => {
    render(<Input className="custom-class" role="input" disabled />);
    const inputElement = screen.getByRole("input");
    expect(inputElement).toHaveClass("custom-class");
    expect(inputElement).toBeDisabled();
  });
});
