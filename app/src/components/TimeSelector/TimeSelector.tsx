interface Props {
  label: string;
  available: number[][];
  date: Date | null;
  onChange: (date: Date) => void
}

const colors = {
  selected: "bg-white text-gray-700",
  unselected: "bg-transparent hover:bg-black/5"
}

const TimeSelector: React.FC<Props> = ({ label, available, date, onChange }) => {

  const handleClick = (time: number[]) => {
    if (!date) return;
    onChange(new Date(date.getFullYear(), date.getMonth(), date.getDate(), time[0], time[1]))
  }

  const isSelected = (time: number[]) => {
    return date?.getHours() === time[0] && date.getMinutes() === time[1];
  }

  return <div className="flex flex-col gap-2">
    <label className="text-xs text-gray-400 uppercase">{label}</label>
    <div className="flex flex-row bg-gray-100 p-1 font-mono rounded-lg gap-1 h-12">
      {date ? available.map((time, i) => <button
        className={`flex-1 p-2 ${colors[isSelected(time) ? "selected" : "unselected"]} rounded-md`}
        onClick={() => handleClick(time)}
        key={i}
      >{time.map((e) => e.toString().padEnd(2, "0")).join(":")}</button>) : null}
    </div>
  </div>
};

export default TimeSelector;