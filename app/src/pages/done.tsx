import { useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";

const Done: React.FC = () => {
  const navigate = useNavigate();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => navigate("/");

  return (
    <div className="gradient h-screen flex items-center justify-center">
      <div className="container max-w-3xl bg-white flex flex-row p-6 gap-8 rounded-2xl">
        <div className="flex-1 flex flex-col gap-4">
          <div>
            <h1 className="font-bold tracking-tighter text-4xl">Schedule(me)</h1>
            <p className="text-gray-400 text-lg">Success! Your appointment has been scheduled. See you later!</p>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-row justify-end mt-8 gap-2">
            <Button
              label="Back"
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Done;