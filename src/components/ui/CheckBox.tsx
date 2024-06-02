import { cn } from "@/utils"

type CheckBoxProps = React.InputHTMLAttributes<HTMLInputElement>
export default function CheckBox({ className, type, ...props }: CheckBoxProps) {
  if (type) {
    console.warn(
      "The prop `type` is not supported on `CheckBox component`. always set `type` to `checkbox`."
    )
  }
  return (
    <input
      type="checkbox"
      className={cn(
        "checkbox h-5 w-5 cursor-pointer appearance-none rounded-full border bg-black px-2 outline-none checked:border-transparent checked:bg-green-500 focus:border-inherit focus:outline-none",
        className
      )}
      {...props}
    />
  )
}
