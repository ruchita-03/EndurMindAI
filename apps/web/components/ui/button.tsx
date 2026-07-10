interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="
      bg-blue-600
      hover:bg-blue-700
      transition
      rounded-xl
      px-5
      py-3
      text-white
      font-medium
      disabled:opacity-50
      "
    >
      {children}
    </button>
  );
}