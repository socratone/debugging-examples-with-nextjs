interface SecondaryButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

const SecondaryButton = ({ onClick, children }: SecondaryButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 border bg-yellow-400 font-bold text-white rounded cursor-pointer "
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
