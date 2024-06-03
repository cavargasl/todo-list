import { defaultColumns, defaultTasks } from "@/const"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import KanbanBoard from "../KanbanBoard"

describe("KanbanBoard", () => {
  beforeEach(() => {
    render(<KanbanBoard />)
  })

  test("renders the board title", () => {
    const titleElement = screen.getByLabelText(/Kanban Board/i)
    expect(titleElement).toBeInTheDocument()
  })

  test("renders a column container for each column", () => {
    const columnContainers = screen.getAllByLabelText("column")
    expect(columnContainers.length).toBe(defaultColumns.length)
  })

  test("renders a button to add a new column", () => {
    const addColumnButton = screen.getByRole("button", { name: /Add column/i })
    expect(addColumnButton).toBeInTheDocument()
  })

  test("input for new column not is rendered", () => {
    expect(
      screen.queryByPlaceholderText("Enter column title")
    ).not.toBeInTheDocument()
  })

  describe("renders a tasks in the columns", () => {
    test("renders all tasks", () => {
      const taskElements = screen.getAllByLabelText("task")
      expect(taskElements.length).toBe(defaultTasks.length)
    })

    test("renders tasks in the corresponding column", () => {
      const columnContainers = screen.getAllByLabelText("column")
      defaultTasks.forEach((task) => {
        const columnElement = columnContainers[task.stage]
        const { getByText } = within(columnElement)
        expect(getByText(task.name)).toBeInTheDocument()
      })
    })
  })

  describe("when the 'Add column' button is clicked", () => {
    beforeEach(async () => {
      const addColumnButton = screen.getByRole("button", {
        name: /Add column/i,
      })
      await userEvent.click(addColumnButton)
    })

    test("renders an input to enter the column title", () => {
      const inputElement = screen.getByPlaceholderText("Enter column title")
      expect(inputElement).toBeInTheDocument()
    })

    test("hides the 'Add column' button", () => {
      expect(
        screen.queryByRole("button", { name: /Add column/i })
      ).not.toBeInTheDocument()
    })

    describe("when the 'Enter' key is pressed in the input", () => {
      test("hides the input", async () => {
        const inputElement = screen.getByPlaceholderText("Enter column title")
        await userEvent.type(inputElement, "New Column")
        expect(inputElement).toHaveValue("New Column")
        await userEvent.type(inputElement, "{enter}")
        expect(inputElement).not.toBeInTheDocument()
      })
      test("shows the 'Add column' button", async () => {
        const inputElement = screen.getByPlaceholderText("Enter column title")
        await userEvent.type(inputElement, "New Column")
        expect(inputElement).toHaveValue("New Column")
        await userEvent.type(inputElement, "{enter}")
        expect(
          screen.getByRole("button", { name: /Add column/i })
        ).toBeInTheDocument()
      })
      test("renders a new column container", async () => {
        const inputElement = screen.getByPlaceholderText("Enter column title")
        await userEvent.type(inputElement, "New Column")
        await userEvent.type(inputElement, "{enter}")
        const columnContainers = screen.getAllByLabelText("column")
        expect(columnContainers.length).toBe(defaultColumns.length + 1)
        expect(screen.getByText("New Column")).toBeInTheDocument()
      })
    })

    describe("when the input is on blurred", () => {
      test("hides the input on tab", async () => {
        const inputElement = screen.getByPlaceholderText("Enter column title")
        await userEvent.type(inputElement, "New Column")
        expect(inputElement).toHaveValue("New Column")
        await userEvent.tab() // Simulate blurring the input
        expect(inputElement).not.toBeInTheDocument()
      })
      test("hides the input on click outside", async () => {
        const inputElement = screen.getByPlaceholderText("Enter column title")
        await userEvent.type(inputElement, "New Column")
        expect(inputElement).toHaveValue("New Column")
        await userEvent.click(document.body)
        expect(inputElement).not.toBeInTheDocument()
      })
      test("shows the 'Add column' button", async () => {
        const inputElement = screen.getByPlaceholderText("Enter column title")
        await userEvent.type(inputElement, "New Column")
        expect(inputElement).toHaveValue("New Column")
        await userEvent.tab()
        expect(
          screen.getByRole("button", { name: /Add column/i })
        ).toBeInTheDocument()
        expect(screen.queryByText("New Column")).not.toBeInTheDocument()
      })
      test("shows the 'Add column' button on click outside", async () => {
        const inputElement = screen.getByPlaceholderText("Enter column title")
        await userEvent.type(inputElement, "New Column")
        expect(inputElement).toHaveValue("New Column")
        await userEvent.click(document.body)
        expect(
          screen.getByRole("button", { name: /Add column/i })
        ).toBeInTheDocument()
        expect(screen.queryByText("New Column")).not.toBeInTheDocument()
      })
      test("does not render a new column container", async () => {
        const inputElement = screen.getByPlaceholderText("Enter column title")
        await userEvent.type(inputElement, "New Column")
        await userEvent.tab()
        const columnContainers = screen.getAllByLabelText("column")
        expect(columnContainers.length).toBe(defaultColumns.length)
        expect(screen.queryByText("New Column")).not.toBeInTheDocument()
      })
    })

    describe("when the input press 'Esc' key", () => {
      test("hides the input", async () => {
        const inputElement = screen.getByPlaceholderText("Enter column title")
        await userEvent.type(inputElement, "New Column")
        expect(inputElement).toHaveValue("New Column")
        await userEvent.type(inputElement, "{escape}")
        expect(inputElement).not.toBeInTheDocument()
      })

      test("shows the 'Add column' button", async () => {
        const inputElement = screen.getByPlaceholderText("Enter column title")
        await userEvent.type(inputElement, "New Column")
        expect(inputElement).toHaveValue("New Column")
        await userEvent.type(inputElement, "{escape}")
        expect(
          screen.getByRole("button", { name: /Add column/i })
        ).toBeInTheDocument()
      })

      test("does not render a new column container", async () => {
        const inputElement = screen.getByPlaceholderText("Enter column title")
        await userEvent.type(inputElement, "New Column")
        await userEvent.type(inputElement, "{escape}")
        const columnContainers = screen.getAllByLabelText("column")
        expect(columnContainers.length).toBe(defaultColumns.length)
        expect(screen.queryByText("New Column")).not.toBeInTheDocument()
      })
    })
  })
})
