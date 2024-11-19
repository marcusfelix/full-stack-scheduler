interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Input: React.FC<Props> = ({ label, ...props }) => {

  return <button
    type="button"
    className="bg-black text-white px-6 py-3 rounded-full text-sm font-semibold"
    {...props}>
    {label}
  </button>
};

export default Input;