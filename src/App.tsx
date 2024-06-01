import KanbanBoard from "@/components/KanbanBoard";

function App() {
  return (
    <div className="flex flex-col min-h-screen gap-4 justify-center overflow-y-hidden px-[40px]">
      <header className="w-full text-center font-bold text-3xl">
        <h1>Todo List</h1>
      </header>
      <KanbanBoard />
    </div>
  );
}

export default App;
