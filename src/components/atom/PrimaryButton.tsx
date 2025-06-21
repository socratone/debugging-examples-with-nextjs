interface PrimaryButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

const PrimaryButton = ({ onClick, children }: PrimaryButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 border bg-blue-400 font-bold text-white rounded cursor-pointer "
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
