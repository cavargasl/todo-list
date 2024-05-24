import PlusIcon from "./icons/PlusIcon";
import TrashIcon from "./icons/TrashIcon";
import Button from "./ui/Button";

type Props = {
  title: string;
};

export default function ColumnContainer({ title }: Props) {
  return (
    <div className="bg-foreground w-[350px] h-[500px] rounded-md flex flex-col">
      <header className="text-lg bg-background h-[60px] rounded-t-md p-3 font-bold border-foreground border-4 flex justify-between items-center">
        {title}
        <Button variant={"ghost"} size={"icon"}>
          <TrashIcon />
        </Button>
      </header>
      <main className="flex flex-grow"></main>
      <footer className="p-3 text-gray-500 flex gap-2">
        <PlusIcon /> Add item
      </footer>
    </div>
  );
}
