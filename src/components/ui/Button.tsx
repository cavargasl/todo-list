import { cn } from "@/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "h-[60px] w-[350px] cursor-pointer rounded-lg bg-background border-2 border-foreground p-4 ring-rose-500 hover:ring-2 flex gap-2",
        className
      )}
      {...props}
    />
  );
}
