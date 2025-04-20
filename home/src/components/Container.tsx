

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: Props) => {
  function cn(arg0: string, className: string | undefined): string | undefined {
    throw new Error("Function not implemented.");
  }

  return (
    <div className={cn("max-w-(--breakpoint-xl) mx-auto px-4", className)}>
      {children}
    </div>
  );
};

export default Container;
