interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const TextArea: React.FC<Props> = ({ label, ...props }) => {

  return <div className="flex flex-col gap-2">
    <label className="text-xs text-gray-400 uppercase">{label}</label>
    <textarea className="bg-gray-100 placeholder:text-gray-300 rounded-md px-4 py-3" {...props}></textarea>
  </div>
};

export default TextArea;