import { useState } from "react"
import { defaultColumns } from "@/const"

export default function useColumns() {
  const [columns, setColumns] = useState(defaultColumns)

  function addColumn(title: string) {
    setColumns((prevColumns) => [...prevColumns, title])
  }

  function deleteColumn(index: number) {
    setColumns((prevColumns) => prevColumns.filter((_, i) => i !== index))
  }

  function editColumn({
    title,
    columnIndex,
  }: {
    title: string
    columnIndex: number
  }) {
    setColumns((prevColumns) =>
      prevColumns.map((column, index) =>
        index === columnIndex ? title : column
      )
    )
  }

  return { columns, addColumn, deleteColumn, editColumn }
}

export type FunctionsColumn = ReturnType<typeof useColumns>
