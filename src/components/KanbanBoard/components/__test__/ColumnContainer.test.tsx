import { defaultTasks } from "@/const"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import ColumnContainer from "../ColumnContainer"
import TaskCard from "../TaskCard"

const onDeleteColumnMock = vi.fn()
const onEditTitleMock = vi.fn()
const onAddTaskMock = vi.fn()
const mockTitle = "Test Column"
const mockColumnIndex = 0
const functionsTaskMock = {
  onDeleteTask: vi.fn(),
  onEditTask: vi.fn(),
  onMoveTask: vi.fn(),
}

describe("ColumnContainer", () => {
  beforeEach(() => {
    render(
      <ColumnContainer
        title={mockTitle}
        columnIndex={mockColumnIndex}
        onDeleteColumn={onDeleteColumnMock}
        onEditTitle={onEditTitleMock}
        onAddTask={onAddTaskMock}
      >
        <TaskCard
          task={defaultTasks[0]}
          functionsTask={functionsTaskMock}
          lastStage={true}
        />
        <TaskCard
          task={defaultTasks[1]}
          functionsTask={functionsTaskMock}
          lastStage={false}
        />
      </ColumnContainer>
    )
  })

  test("renders the component", () => {
    const columnContainerElement = screen.getByRole("listitem", {
      name: "column",
    })
    expect(columnContainerElement).toBeInTheDocument()
  })

  test("renders the title correctly", () => {
    const titleElement = screen.getByText(mockTitle)
    expect(titleElement).toBeInTheDocument()
  })

  test("renders the tasks correctly", () => {
    const tasksContent = screen.getByRole("list", { name: "tasks" })
    expect(tasksContent.children).toHaveLength(2)
    expect(screen.getByText(defaultTasks[0].name)).toBeInTheDocument()
    expect(screen.getByText(defaultTasks[1].name)).toBeInTheDocument()
  })

  test("renders the add task button", () => {
    const addTaskButton = screen.getByRole("button", { name: /add item/i })
    expect(addTaskButton).toBeInTheDocument()
  })

  describe("when adding a new task", () => {
    beforeEach(async () => {
      const addTaskButton = screen.getByRole("button", { name: /add item/i })
      await userEvent.click(addTaskButton)
    })

    test("renders an input to enter the task name", () => {
      const inputElement = screen.getByPlaceholderText("Enter item")
      expect(inputElement).toBeInTheDocument()
    })

    test("hides the 'Add task' button", () => {
      expect(
        screen.queryByRole("button", { name: /Add item/i })
      ).not.toBeInTheDocument()
    })
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
      expect(onEditTitleMock).toHaveBeenCalledWith({
        title: "New title",
        columnIndex: mockColumnIndex,
      })
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

      await userEvent.type(inputEditTitle, "{escape}")
      expect(
        screen.queryByRole("textbox", { name: "Edit column title" })
      ).not.toBeInTheDocument()
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
  })
})
