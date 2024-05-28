import { cn } from "@/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "bg-black focus:border-rose-500 border rounded outline-none px-2 w-full",
        className
      )}
      {...props}
    />
  );
}
