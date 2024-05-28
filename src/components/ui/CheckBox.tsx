import { cn } from "@/utils";

type CheckBoxProps = React.InputHTMLAttributes<HTMLInputElement>;
export default function CheckBox({ className, ...props }: CheckBoxProps) {
  return (
    <input
      type="checkbox"
      className={cn(
        "checkbox w-5 h-5 rounded-full checked:bg-green-500 checked:border-transparent focus:outline-none appearance-none cursor-pointer focus:border-inherit bg-black border outline-none px-2",
        className
      )}
      {...props}
    />
  );
}
