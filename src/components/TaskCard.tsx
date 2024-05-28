import { Task } from "@/types";
import ArrowLeft from "./icons/ArrowLeft";
import ArrowRight from "./icons/ArrowRight";
import TrashIcon from "./icons/TrashIcon";
import Button from "./ui/Button";

export default function TaskCard({ Task: { name } }: { Task: Task }) {
  return (
    <article className="bg-background w-full p-2 rounded-md flex">
      <p className="w-full mx-2">{name}</p>
      <div className="flex gap-1">
        <Button
          variant={"ghost"}
          size={"icon"}
          className="h-[20px] w-[20px] p-0"
        >
          <ArrowLeft />
        </Button>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="h-[20px] w-[20px] p-0"
        >
          <ArrowRight />
        </Button>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="h-[20px] w-[20px] p-0"
        >
          <TrashIcon />
        </Button>
      </div>
    </article>
  );
}
