import { defaultTasks } from "@/const"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import ColumnContainer from "../ColumnContainer"

const onDeleteColumnMock = vi.fn()
const onEditTitleMock = vi.fn()
const mockTitle = "Test Column"
const taskInStage0 = defaultTasks.filter((task) => task.stage === 0)

describe("ColumnContainer", () => {
  beforeEach(() => {
    render(
      <ColumnContainer
        title={mockTitle}
        tasks={taskInStage0}
        onDeleteColumn={onDeleteColumnMock}
        onEditTitle={onEditTitleMock}
      />
    )
  })

  test("renders the component", () => {
    const columnContainerElement = screen.getByRole("listitem", {
      name: "column",
    })
    expect(columnContainerElement).toMatchSnapshot()
  })

  test("renders the title correctly", () => {
    const titleElement = screen.getByText(mockTitle)
    expect(titleElement).toBeInTheDocument()
  })

  test("renders the tasks correctly", () => {
    const taskElements = screen.getAllByRole("listitem", { name: /task/i })
    const tasksContent = screen.getByRole("list", { name: "tasks" })
    expect(tasksContent.children).toHaveLength(taskInStage0.length)
    taskInStage0.forEach((task) => {
      const taskElement = taskElements.find(
        (element) => element.textContent === task.name
      )
      expect(taskElement).toBeInTheDocument()
    })
    defaultTasks
      .filter((e) => e.stage !== 0)
      .forEach((task) => {
        const taskElement = screen.queryByText(task.name)
        expect(taskElement).not.toBeInTheDocument()
      })
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
      const inputEditTitle = screen.getByRole("textbox", {
        name: "Edit column title",
      })
      expect(inputEditTitle).toBeInTheDocument()
      await userEvent.type(inputEditTitle, "New title{enter}", {
        initialSelectionStart: 0,
        initialSelectionEnd: 11,
      })
      expect(onEditTitleMock).toHaveBeenCalled()
      expect(onEditTitleMock).toHaveBeenCalledWith("New title")
      expect(screen.getByText("New title")).toBeInTheDocument()
      expect(
        screen.queryByRole("textbox", { name: "Edit column title" })
      ).not.toBeInTheDocument()
    })

    test("cancel the edit mode when the escape key is pressed", async () => {
      const inputEditTitle = screen.getByRole("textbox", {
        name: "Edit column title",
      })
      expect(inputEditTitle).toBeInTheDocument()
      await userEvent.type(inputEditTitle, "cancel", {
        initialSelectionStart: 0,
        initialSelectionEnd: 11,
      })
      expect(inputEditTitle).toHaveValue("cancel")
      await userEvent.type(inputEditTitle, "{esc}")
      expect(
        screen.queryByRole("textbox", { name: "Edit column title" })
      ).not.toHaveValue("cancel")
      expect(screen.getByText(mockTitle)).toBeInTheDocument()
    })

    test("cancel the edit mode when the input loses focus with tab", async () => {
      const inputEditTitle = screen.getByRole("textbox", {
        name: "Edit column title",
      })
      expect(inputEditTitle).toBeInTheDocument()
      await userEvent.type(inputEditTitle, "canceled blur", {
        initialSelectionStart: 0,
        initialSelectionEnd: 11,
      })
      await userEvent.tab()
      expect(screen.queryByText("canceled blur")).not.toBeInTheDocument()
      expect(screen.getByText(mockTitle)).toBeInTheDocument()
    })
    test("cancel the edit mode when the input loses focus", async () => {
      const inputEditTitle = screen.getByRole("textbox", {
        name: "Edit column title",
      })
      expect(inputEditTitle).toBeInTheDocument()
      await userEvent.type(inputEditTitle, "{backspace} 1")
      await userEvent.click(document.body)
      expect(screen.queryByText(mockTitle + " 1")).not.toBeInTheDocument()
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
      const columnContainerElement = screen.getByRole("listitem", {
        name: "column",
      })
      expect(columnContainerElement).toBeInTheDocument()
      const deleteColumnButton = screen.getByRole("button", {
        name: /delete column/i,
      })
      await userEvent.click(deleteColumnButton)
      expect(screen.queryByText(mockTitle)).not.toBeInTheDocument()
    })
  })
})
