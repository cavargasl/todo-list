import { cn } from "@/utils"

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-md border bg-black px-2 outline-none focus:border-rose-500",
        className
      )}
      {...props}
    />
  )
}
