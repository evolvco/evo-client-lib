interface ButtonGroupProps {
    children: React.ReactNode;
    className?: string;
  }
  
  export function ButtonGroup({ children, className }: ButtonGroupProps) {
    return <div className={`${className} gap-2 flex flex-row`}>{children}</div>;
  }
  