import { cn } from "@/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-semibold transition-all focus-visible:outline-none focus-visible:ring-foreground focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 ease-out-circ text-nowrap",
  {
    variants: {
      variant: {
        default:
          "bg-background border-2 border-foreground ring-rose-500 hover:ring-2 gap-2",
        ghost: "text-gray-500 hover:text-white hover:bg-foreground",
      },
      size: {
        default: "h-[60px] p-3",
        icon: "rounded px-1 py-2 h-[40px] w-[40px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonProps = VariantProps<typeof buttonVariants> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
