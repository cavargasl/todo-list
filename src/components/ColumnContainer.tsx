import PlusIcon from "./icons/PlusIcon";
import TrashIcon from "./icons/TrashIcon";
import Button from "./ui/Button";

type Props = {
  title: string;
};

export default function ColumnContainer({ title }: Props) {
  return (
    <div className="bg-foreground w-[350px] h-[500px] rounded-md flex flex-col p-1">
      <header className="text-lg bg-background h-[60px] rounded-md p-3 font-bold flex justify-between items-center">
        {title}
        <Button variant={"ghost"} size={"icon"}>
          <TrashIcon />
        </Button>
      </header>
      <main className="flex flex-grow"></main>
      <footer>
        <Button variant={"ghost"} size={"small"} className="w-full justify-start hover:bg-background">
          <PlusIcon />
          Add item
        </Button>
      </footer>
    </div>
  );
}
