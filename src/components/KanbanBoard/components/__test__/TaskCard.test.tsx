import { defaultTasks } from "@/const"
import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import TaskCard from "../TaskCard"

const defaultTask = defaultTasks[0]
const defaultTaskCompleted = defaultTasks[1]
const functionsTaskMock = {
  onDeleteTask: vi.fn(),
  onEditTask: vi.fn(),
  onMoveTask: vi.fn(),
}

describe("TaskCard", () => {
  beforeEach(() => {
    render(
      <TaskCard
        task={defaultTask}
        functionsTask={functionsTaskMock}
        lastStage={false}
      />
    )
  })

  test("renders the component ", () => {
    expect(screen.getByRole("listitem", { name: "task" })).toMatchSnapshot()
  })

  test("renders task name and checkbox", () => {
    const taskNameElement = screen.getByRole("paragraph")
    expect(taskNameElement).toBeInTheDocument()
    expect(taskNameElement).toHaveTextContent(defaultTask.name)
    expect(screen.getByRole("checkbox")).toBeInTheDocument()
  })

  test("renders component with completed style", () => {
    cleanup()
    render(
      <TaskCard
        task={defaultTaskCompleted}
        functionsTask={functionsTaskMock}
        lastStage
      />
    )
    expect(screen.getByRole("listitem", { name: "task" })).toMatchSnapshot()
    expect(screen.getByRole("paragraph")).toHaveStyle(
      "text-decoration-line: line-through"
    )
    expect(screen.getByRole("checkbox")).toBeChecked()
  })

  test("renders component with not completed style", () => {
    expect(screen.getByRole("paragraph")).not.toHaveStyle(
      "text-decoration-line: line-through"
    )
    expect(screen.getByRole("checkbox")).not.toBeChecked()
  })

  test("renders the buttons", () => {
    const buttons = screen.getAllByRole("button")
    expect(buttons).toHaveLength(3)
    expect(buttons[0]).toHaveAttribute("aria-label", "move to left")
    expect(buttons[1]).toHaveAttribute("aria-label", "move to right")
    expect(buttons[2]).toHaveAttribute("aria-label", "delete task")
  })

  describe("when clicking the buttons", () => {
    test("calls the function to move to left the task", async () => {
      const moveTaskLeftButton = screen.getByRole("button", {
        name: "move to left",
      })
      expect(moveTaskLeftButton).toBeInTheDocument()
      await userEvent.click(moveTaskLeftButton)
      expect(functionsTaskMock.onMoveTask).toHaveBeenCalled()
      expect(functionsTaskMock.onMoveTask).toHaveBeenCalledWith({
        taskId: defaultTask.id,
        newStage: defaultTask.stage - 1,
      })
    })

    test("disables the button to move to left when the task is in the first stage", async () => {
      cleanup()
      render(
        <TaskCard
          task={{ ...defaultTask, stage: 0 }}
          functionsTask={functionsTaskMock}
          lastStage={false}
        />
      )
      const moveTaskLeftButton = screen.getByRole("button", {
        name: "move to left",
      })
      expect(moveTaskLeftButton).toBeDisabled()
      let clickedFailed = false
      try {
        await userEvent.click(moveTaskLeftButton)
      } catch (error) {
        clickedFailed = true
      }
      expect(clickedFailed).toBe(true)
    })

    test("calls the function to move to right the task", async () => {
      const moveTaskRightButton = screen.getByRole("button", {
        name: "move to right",
      })
      expect(moveTaskRightButton).toBeInTheDocument()
      await userEvent.click(moveTaskRightButton)
      expect(functionsTaskMock.onMoveTask).toHaveBeenCalled()
      expect(functionsTaskMock.onMoveTask).toHaveBeenCalledWith({
        taskId: defaultTask.id,
        newStage: defaultTask.stage + 1,
      })
    })

    test("disables the button to move to right when the task is in the last stage", async () => {
      cleanup()
      render(
        <TaskCard
          task={defaultTask}
          functionsTask={functionsTaskMock}
          lastStage
        />
      )
      const moveTaskRightButton = screen.getByRole("button", {
        name: "move to right",
      })
      expect(moveTaskRightButton).toBeDisabled()
      let clickedFailed = false
      try {
        await userEvent.click(moveTaskRightButton)
      } catch (error) {
        clickedFailed = true
      }
      expect(clickedFailed).toBe(true)
    })

    test("calls the function to delete the task", async () => {
      const deleteTaskButton = screen.getByRole("button", {
        name: "delete task",
      })
      expect(deleteTaskButton).toBeInTheDocument()
      await userEvent.click(deleteTaskButton)
      expect(functionsTaskMock.onDeleteTask).toHaveBeenCalled()
      expect(functionsTaskMock.onDeleteTask).toHaveBeenCalledWith(
        defaultTask.id
      )
      expect(
        screen.queryByRole("listitem", { name: "task" })
      ).not.toBeInTheDocument()
    })
  })

  test("calls the function when clicking the checkbox", async () => {
    const checkboxElement = screen.getByRole("checkbox")
    expect(checkboxElement).toBeInTheDocument()
    await userEvent.click(checkboxElement)
    expect(functionsTaskMock.onEditTask).toHaveBeenCalled()
    expect(functionsTaskMock.onEditTask).toHaveBeenCalledWith({
      taskId: defaultTask.id,
      newTask: { ...defaultTask, completed: !defaultTask.completed },
    })
  })
})
