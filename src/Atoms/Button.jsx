const variants = {
  blue: "bg-blue-900",
  green: "bg-emerald-900",
  red: "bg-red-900",
};

const Button = ({
  children = "button",
  onClick,
  variant = "blue",
  ...props
}) => {
  return (
    <button
      class={`text-white rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 ${variants[variant]}`}
      type="button"
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
