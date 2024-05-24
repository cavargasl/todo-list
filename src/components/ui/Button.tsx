type ButtonProps = {
  children: React.ReactNode
}

export default function Button({ children}: ButtonProps) {
  return <button className="h-[60px] w-[350px] cursor-pointer rounded-lg bg-background border-2 border-foreground p-4 ring-rose-500 hover:ring-2">{children}</button>
}
