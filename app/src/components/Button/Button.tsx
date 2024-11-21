interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  scheme?: "action" | "secondary"
}

const colors = {
  action: "bg-black text-white",
  secondary: "bg-gray-200 text-gray-600"
}

const Input: React.FC<Props> = ({ label, scheme = "action", ...props }) => {

  return <button
    type="button"
    className={`${colors[scheme]} px-6 py-3 rounded-full text-sm font-semibold`}
    {...props}>
    {label}
  </button>
};

export default Input;