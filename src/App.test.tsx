import { render, screen } from "@testing-library/react"

import App from "./App"

describe("App", () => {
  it("renders app title", () => {
    render(<App />)
    const titleElement = screen.getByText(/Todo List/i)
    expect(titleElement).toBeInTheDocument()
  })

  it("renders kanban board", () => {
    render(<App />)
    const boardElement = screen.getByRole("main", { name: /Kanban Board/i })
    expect(boardElement).toBeInTheDocument()
  })
})
