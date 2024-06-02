import { KanbanBoard } from "@/components/KanbanBoard"

function App() {
  return (
    <div className="flex min-h-screen flex-col justify-center gap-4 overflow-y-hidden px-[40px]">
      <header className="w-full text-center text-3xl font-bold">
        <h1>Todo List</h1>
      </header>
      <KanbanBoard />
    </div>
  )
}

export default App
