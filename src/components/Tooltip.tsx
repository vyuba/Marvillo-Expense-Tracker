interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip = ({ text, children }: TooltipProps) => {
  return (
    <div className={`relative  inline-block cursor-pointer`}>
      <div
        className={` block absolute left-full translate-x-[10px] mb-2 w-max whitespace-nowrap rounded bg-secondary border border-border text-white text-sm px-2 py-1 group-hover:block opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      >
        {text}
      </div>
      {children}
    </div>
  );
};

export default Tooltip;
