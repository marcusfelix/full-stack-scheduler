import { useState } from "react";
import Button from "../components/Button/Button";
import DatePicker from "../components/DatePicker/DatePicker";
import Input from "../components/Input/Input";
import TextArea from "../components/TextArea/TextArea";
import TimeSelector from "../components/TimeSelector/TimeSelector";
import { useToast } from "../context/toast";
import { EventService } from "../services/event";
import { Warning } from "../utils/error";
import { useNavigate } from "react-router-dom";

type Props = {

}

const New: React.FC<Props> = ({ }) => {
  const navigate = useNavigate();
  const { show } = useToast();
  const [date, setDate] = useState<Date | null>(null)
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleField: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    switch (event.target.name) {
      case "name":
        setName(event.target.value);
        break;

      case "description":
        setDescription(event.target.value);
        break;

      default:
        break;
    }
  }

  const handleSave = async () => {
    try {
      if (name === '') {
        throw new Warning('Missing name value');
      }

      if (description === '') {
        throw new Warning('Missing description value');
      }

      if (date === null) {
        throw new Warning('Missing date value');
      }

      await EventService.create(name, description, date!.toISOString());

      show('Event created successfuly', 'info');
      navigate("/done");
    } catch (error) {
      if (error instanceof Error) {
        show(error.message, "alert");
      } else if (error instanceof Warning) {
        show(error.message, "warning");
      }
    }
  }

  const handleDateChange = (date: Date) => {
    setDate(date)
  }

  return (
    <div className="gradient h-screen flex items-center justify-center">
      <div className="container max-w-3xl bg-white flex flex-row p-6 gap-8 rounded-2xl">
        <div className="flex-1 flex flex-col gap-4">
          <div>
            <h1 className="font-bold tracking-tighter text-4xl">Schedule(me)</h1>
            <p className="text-gray-400 text-lg">Select one of the time slots available for our meeting.</p>
          </div>
          <form className="flex flex-col gap-4">
            <Input
              name="name"
              type="name"
              label="Your name"
              onChange={handleField}
            />
            <TextArea
              name="description"
              rows={8}
              label="Description"
              onChange={handleField}
            />
          </form>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <DatePicker
            today={new Date()}
            selected={date}
            onChange={handleDateChange}
          />
          <TimeSelector
            label="Available times"
            available={[[15, 30], [16, 0], [16, 30], [17, 0]]}
            date={date}
            onChange={handleDateChange}
          />
          <div className="flex flex-row justify-end mt-8 gap-2">
            <Button
              label="Save"
              onClick={handleSave}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default New;