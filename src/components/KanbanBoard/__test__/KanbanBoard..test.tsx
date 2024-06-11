import { defaultColumns, defaultTasks } from "@/const"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import KanbanBoard from "../KanbanBoard"

describe("KanbanBoard", () => {
  beforeEach(() => {
    render(<KanbanBoard />)
  })

  test("renders the board", () => {
    const titleElement = screen.getByLabelText(/Kanban Board/i)
    expect(titleElement).toBeInTheDocument()
  })

  test("renders all columns with the correct title", () => {
    defaultColumns.forEach((column) => {
      const columnElement = screen.getByText(column)
      expect(columnElement).toBeInTheDocument()
    })
  })

  test("show the new column title when edit title", async () => {
    const column = screen.getAllByLabelText("column")[0]
    const { getByText, getByRole } = within(column)
    await userEvent.click(getByText(defaultColumns[0]))
    const inputEditTitle = getByRole("textbox", {
      name: "Edit column title",
    })
    expect(inputEditTitle).toBeInTheDocument()
    await userEvent.type(inputEditTitle, "New title{enter}", {
      initialSelectionStart: 0,
      initialSelectionEnd: 11,
    })
    expect(screen.getByText("New title")).toBeInTheDocument()
  })

  describe("when the delete button from column is clicked", () => {
    test("hide the column", async () => {
      const columnContainers = screen.getAllByLabelText("delete column")
      expect(columnContainers.length).toBe(defaultColumns.length)
      const deleteColumnButton = screen.getAllByRole("button", {
        name: /delete column/i,
      })[1]
      await userEvent.click(deleteColumnButton)
      const columnContainersAfterDelete = screen.getAllByLabelText("column")
      expect(columnContainersAfterDelete.length).toBe(defaultColumns.length - 1)
      expect(screen.queryByText(defaultColumns[1])).not.toBeInTheDocument()
    })
    test("delete tasks into the column", async () => {
      const columnElement = screen.getAllByLabelText("column")[0]
      const { getAllByRole, getByRole } = within(columnElement)
      const tasksElements = getAllByRole("listitem", { name: "task" })
      expect(tasksElements.length).toBe(
        defaultTasks.filter((task) => task.stage === 0).length
      )
      const deleteColumnButton = getByRole("button", {
        name: /delete column/i,
      })
      await userEvent.click(deleteColumnButton)
      const columnContainersAfterDelete = screen.getAllByLabelText("column")
      expect(columnContainersAfterDelete.length).toBe(defaultColumns.length - 1)
      for (const task of defaultTasks.filter((task) => task.stage === 0)) {
        expect(screen.queryByText(task.name)).not.toBeInTheDocument()
      }
      for (const task of defaultTasks.filter((task) => task.stage !== 0)) {
        expect(screen.queryByText(task.name)).toBeInTheDocument()
      }
    })
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

    describe("when interacting with the tasks", () => {
      test("not move the task when the move to left button is clicked and stage is 0", async () => {
        const moveTaskLeftButton = screen.getAllByRole("button", {
          name: "move to left",
        })[0]
        expect(moveTaskLeftButton).toBeDisabled()
      })

      test("move the task when the move to left button is clicked", async () => {
        const columnPosition1 = screen.getAllByRole("listitem", {
          name: "column",
        })[1]
        const taskStage1 = within(columnPosition1).getAllByRole("listitem", {
          name: "task",
        })[0]
        const taskText = taskStage1.textContent
        if (!taskText) throw new Error("Task text is empty")
        expect(within(columnPosition1).getByText(taskText)).toBeInTheDocument()
        const moveTaskLeftButton = within(taskStage1).getByRole("button", {
          name: "move to left",
        })
        await userEvent.click(moveTaskLeftButton)
        const columnPosition0 = screen.getAllByRole("listitem", {
          name: "column",
        })[0]
        expect(within(columnPosition0).getByText(taskText)).toBeInTheDocument()
        expect(
          within(columnPosition1).queryByText(taskText)
        ).not.toBeInTheDocument()
      })

      test("disables the button to move to right when the task is in the last stage", async () => {
        const lastColumn = screen.getAllByRole("listitem", { name: "column" })[
          defaultColumns.length - 1
        ]
        const lastTask = within(lastColumn).getByRole("listitem", {
          name: "task",
        })
        const moveTaskRightButton = within(lastTask).getByRole("button", {
          name: "move to right",
        })
        expect(lastTask).toBeInTheDocument()
        expect(moveTaskRightButton).toBeDisabled()
      })

      test("move the task when the move to right button is clicked", async () => {
        const columnPosition1 = screen.getAllByRole("listitem", {
          name: "column",
        })[1]
        const taskStage1 = within(columnPosition1).getByRole("listitem", {
          name: "task",
        })
        const taskText = taskStage1.textContent
        if (!taskText) throw new Error("Task text is empty")
        expect(within(columnPosition1).getByText(taskText)).toBeInTheDocument()
        const moveTaskRightButton = within(taskStage1).getByRole("button", {
          name: "move to right",
        })
        await userEvent.click(moveTaskRightButton)
        const columnPosition2 = screen.getAllByRole("listitem", {
          name: "column",
        })[2]
        expect(within(columnPosition2).getByText(taskText)).toBeInTheDocument()
        expect(
          within(columnPosition1).queryByText(taskText)
        ).not.toBeInTheDocument()
      })

      test("delete the task when the delete button is clicked", async () => {
        const columnPosition1 = screen.getAllByRole("listitem", {
          name: "column",
        })[1]
        const taskStage1 = within(columnPosition1).getByRole("listitem", {
          name: "task",
        })
        const taskText = taskStage1.textContent
        if (!taskText) throw new Error("Task text is empty")
        expect(within(columnPosition1).getByText(taskText)).toBeInTheDocument()
        const deleteTaskButton = within(taskStage1).getByRole("button", {
          name: "delete task",
        })
        await userEvent.click(deleteTaskButton)
        expect(screen.queryByText(taskText)).not.toBeInTheDocument()
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
      test("renders the new column", async () => {
        const inputElement = screen.getByPlaceholderText("Enter column title")
        await userEvent.type(inputElement, "New Column{enter}")
        const columnContainers = screen.getAllByLabelText("column")
        expect(columnContainers.length).toBe(defaultColumns.length + 1)
        expect(screen.getByText("New Column")).toBeInTheDocument()
      })
      test("dismiss the new column when the input is empty", async () => {
        const inputElement = screen.getByPlaceholderText("Enter column title")
        await userEvent.type(inputElement, "{enter}")
        const columnContainers = screen.getAllByLabelText("column")
        expect(columnContainers.length).toBe(defaultColumns.length)
      })
      test("dismiss the new column when is repeated", async () => {
        const inputElement = screen.getByPlaceholderText("Enter column title")
        await userEvent.type(inputElement, "To do{enter}")
        const columnContainers = screen.getAllByLabelText("column")
        expect(columnContainers.length).toBe(defaultColumns.length)
      })
      test("renders a new column container", async () => {
        const inputElement = screen.getByPlaceholderText("Enter column title")
        await userEvent.type(inputElement, "New Column{enter}")
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

  describe("when the 'Add task' button is clicked", () => {
    beforeEach(async () => {
      const addTaskButton = screen.getAllByRole("button", {
        name: /Add item/i,
      })[1]
      await userEvent.click(addTaskButton)
    })

    describe("when the 'Enter' key is pressed in the input", () => {
      test("hides the input", async () => {
        const inputElement = screen.getByPlaceholderText("Enter item")
        await userEvent.type(inputElement, "New Task")
        expect(inputElement).toHaveValue("New Task")
        await userEvent.type(inputElement, "{enter}")
        expect(inputElement).not.toBeInTheDocument()
      })
      test("shows the 'Add task' button", async () => {
        const inputElement = screen.getByPlaceholderText("Enter item")
        await userEvent.type(inputElement, "New Task")
        expect(inputElement).toHaveValue("New Task")
        await userEvent.type(inputElement, "{enter}")
        expect(
          screen.getAllByRole("button", { name: /Add item/i })[1]
        ).toBeInTheDocument()
      })
      test("renders a new task container", async () => {
        const inputElement = screen.getByPlaceholderText("Enter item")
        const columnElement = screen.getAllByLabelText("column")[1]
        expect(within(columnElement).getAllByLabelText("task").length).toBe(1)
        await userEvent.type(inputElement, "New Task{enter}")
        expect(within(columnElement).getAllByLabelText("task").length).toBe(2)
        expect(screen.getByText("New Task")).toBeInTheDocument()
      })
    })

    describe("when the input is on blurred", () => {
      test("hides the input on tab", async () => {
        const inputElement = screen.getByPlaceholderText("Enter item")
        await userEvent.type(inputElement, "New Task")
        expect(inputElement).toHaveValue("New Task")
        await userEvent.tab()
        expect(inputElement).not.toBeInTheDocument()
      })
      test("hides the input on click outside the input", async () => {
        const inputElement = screen.getByPlaceholderText("Enter item")
        await userEvent.type(inputElement, "New Task")
        expect(inputElement).toHaveValue("New Task")
        await userEvent.click(document.body)
        expect(inputElement).not.toBeInTheDocument()
      })
      test("shows the 'Add task' button", async () => {
        const inputElement = screen.getByPlaceholderText("Enter item")
        await userEvent.type(inputElement, "New Task")
        expect(inputElement).toHaveValue("New Task")
        await userEvent.tab()
        expect(
          screen.getAllByRole("button", { name: /Add item/i })[1]
        ).toBeInTheDocument()
        expect(screen.queryByText("New Task")).not.toBeInTheDocument()
      })
      test("shows the 'Add task' button on click outside the input", async () => {
        const inputElement = screen.getByPlaceholderText("Enter item")
        await userEvent.type(inputElement, "New Task")
        expect(inputElement).toHaveValue("New Task")
        await userEvent.click(document.body)
        expect(
          screen.getAllByRole("button", { name: /Add item/i })[1]
        ).toBeInTheDocument()
        expect(screen.queryByText("New Task")).not.toBeInTheDocument()
      })
      test("does not render a new task container", async () => {
        const inputElement = screen.getByPlaceholderText("Enter item")
        await userEvent.type(inputElement, "New Task")
        await userEvent.tab()
        const taskElements = screen.getAllByLabelText("task")
        expect(taskElements.length).toBe(defaultTasks.length)
        expect(screen.queryByText("New Task")).not.toBeInTheDocument()
      })
    })
  })
})
