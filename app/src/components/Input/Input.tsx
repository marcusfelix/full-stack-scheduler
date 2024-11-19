interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<Props> = ({ label, ...props }) => {

  return <div className="flex flex-col gap-2">
    <label className="text-xs text-gray-400 uppercase">{label}</label>
    <input className="bg-gray-100 placeholder:text-gray-300 rounded-md px-4 py-3" {...props} />
  </div>
};

export default Input;