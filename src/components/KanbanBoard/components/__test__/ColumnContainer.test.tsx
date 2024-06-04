import { defaultTasks } from "@/const"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import ColumnContainer from "../ColumnContainer"

const onDeleteColumnMock = vi.fn()
const onEditTitleMock = vi.fn()
const mockTitle = "Test Column"

describe("ColumnContainer", () => {
  beforeEach(() => {
    render(
      <ColumnContainer
        title={mockTitle}
        tasks={defaultTasks}
        onDeleteColumn={onDeleteColumnMock}
        onEditTitle={onEditTitleMock}
      />
    )
  })

  test("renders the component", () => {
    const columnContainerElement = screen.getByLabelText("column")
    expect(columnContainerElement).toMatchSnapshot()
  })

  test("renders the title correctly", () => {
    const titleElement = screen.getByText(mockTitle)
    expect(titleElement).toBeInTheDocument()
  })

  test("renders the tasks correctly", () => {
    const taskElements = screen.getAllByRole("article", { name: /task/i })
    expect(taskElements.length).toBe(defaultTasks.length)
  })

  test("renders the add task button", () => {
    const addTaskButton = screen.getByRole("button", { name: /add item/i })
    expect(addTaskButton).toBeInTheDocument()
  })

  test("renders the delete column button", () => {
    const deleteColumnButton = screen.getByRole("button", {
      name: /delete column/i,
    })
    expect(deleteColumnButton).toBeInTheDocument()
  })

  describe("when editing the column title", () => {
    beforeEach(async () => {
      await userEvent.click(screen.getByText(mockTitle))
    })

    test("renders the edit column when clicked in the title", async () => {
      expect(screen.queryByText(mockTitle)).not.toBeInTheDocument()
      const inputEditTitle = screen.getByDisplayValue(mockTitle)
      expect(inputEditTitle).toBeInTheDocument()
    })

    test("calls the edit title function when the enter key is pressed", async () => {
      const inputEditTitle = screen.getByLabelText("Edit column title")
      await userEvent.type(inputEditTitle, "New title{enter}")
      expect(onEditTitleMock).toHaveBeenCalledTimes(1)
      expect(screen.getByText("New title")).toBeInTheDocument()
      expect(
        screen.queryByLabelText("Edit column title")
      ).not.toBeInTheDocument()
    })

    test("cancel the edit mode when the escape key is pressed", async () => {
      const inputEditTitle = screen.getByLabelText("Edit column title")
      await userEvent.type(inputEditTitle, "cancel{esc}")
      expect(screen.queryByText("cancel")).not.toBeInTheDocument()
      expect(screen.getByText(mockTitle)).toBeInTheDocument()
    })

    test("cancel the edit mode when the input loses focus", async () => {
      const inputEditTitle = screen.getByDisplayValue(mockTitle)
      await userEvent.type(inputEditTitle, "canceled blur")
      await userEvent.tab()
      expect(screen.queryByText("canceled blur")).not.toBeInTheDocument()
      expect(screen.getByText(mockTitle)).toBeInTheDocument()
      await userEvent.type(inputEditTitle, "canceled blur")
      await userEvent.click(document.body)
      expect(screen.queryByText("canceled blur")).not.toBeInTheDocument()
      expect(screen.getByText(mockTitle)).toBeInTheDocument()
    })
  })

  describe("when the delete column button is clicked", () => {
    test("calls the onDeleteColumn function", async () => {
      const deleteColumnButton = screen.getByRole("button", {
        name: /delete column/i,
      })
      await userEvent.click(deleteColumnButton)
      expect(onDeleteColumnMock).toHaveBeenCalledTimes(1)
    })

    test("delete the column container", async () => {
      const columnContainerElement = screen.getByText(mockTitle)
      expect(columnContainerElement).toBeInTheDocument()
      const deleteColumnButton = screen.getByRole("button", {
        name: /delete column/i,
      })
      await userEvent.click(deleteColumnButton)
      expect(screen.queryByText(mockTitle)).not.toBeInTheDocument()
    })
  })
})
