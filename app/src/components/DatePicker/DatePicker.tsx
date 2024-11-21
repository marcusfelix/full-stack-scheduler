import { IconCaretLeftFilled, IconCaretRightFilled } from "@tabler/icons-react";
import { useState } from "react";
import { compareDates } from "../../utils/date";

type Props = {
  today: Date;
  selected: Date | null;
  onChange: (date: Date) => void
}

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DatePicker: React.FC<Props> = ({ today, selected, onChange }) => {
  const [currentMonth, setCurrentMonth] = useState(today)

  const handleChange = (date: Date) => {
    onChange(date)
  }

  const daysInMonth = (month: Date): Date[] => Array.from({
    length: new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1));

  const pastMonthDays = (month: Date): Date[] => {
    const lastDayPastMonth = new Date(month.getFullYear(), month.getMonth(), 0)
    return Array.from({
      length: lastDayPastMonth.getDay() + 1
    }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i * -1)).reverse();
  }

  const futureMonthDays = (month: Date): Date[] => {
    const firstDayNextMonth = new Date(month.getFullYear(), month.getMonth() + 1, 1)
    return Array.from({
      length: firstDayNextMonth.getDay() + 1
    }, (_, i) => new Date(month.getFullYear(), month.getMonth() + 1, i + 1));
  }

  const prevMonth: React.MouseEventHandler<HTMLButtonElement> = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, currentMonth.getDate()))
  }

  const nextMonth: React.MouseEventHandler<HTMLButtonElement> = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, currentMonth.getDate()))
  }

  return (
    <div>
      <div className="flex flex-row items-center p-3">
        <button onClick={prevMonth}><IconCaretLeftFilled /></button>
        <label className="flex-1 text-center text-lg font-semibold">{monthNames[currentMonth.getMonth()]}</label>
        <button onClick={nextMonth}><IconCaretRightFilled /></button>
      </div>
      <div className="grid grid-cols-7 font-mono">
        {weekDays.map((day, i) => <WeekDay
          day={day}
          key={i}
        />)}
      </div>
      <div className="grid grid-cols-7 font-mono">
        {pastMonthDays(currentMonth).map((day, i) => <Day
          day={day}
          selected={selected}
          key={i}
        />)}
        {daysInMonth(currentMonth).map((day, i) => <Day
          day={day}
          selected={selected}
          onClick={handleChange}
          key={i}
        />)}
        {futureMonthDays(currentMonth).map((day, i) => <Day
          day={day}
          selected={selected}
          key={i}
        />)}
      </div>
    </div>
  )
}

type DayProps = {
  day: Date;
  selected: Date | null;
  onClick?: (date: Date) => void
}

const colors = {
  valid: "text-black hover:bg-gray-100",
  invalid: "text-gray-400",
  selected: "text-white bg-black"
}

const Day: React.FC<DayProps> = ({ day, selected, onClick }) => {

  const handleClick: React.MouseEventHandler = () => {
    if (onClick) {
      onClick(day)
    }
  }

  const isSelected = compareDates(selected, day);

  return (
    <div className={`aspect-square flex items-center justify-center ${colors[isSelected ? "selected" : onClick ? "valid" : "invalid"]} cursor-pointer rounded-full`} onClick={handleClick}>{day.getDate()}</div>
  )
}

type WeekDayProps = {
  day: string;
}

const WeekDay: React.FC<WeekDayProps> = ({ day }) => {

  return (
    <div className="aspect-square flex items-center justify-center text-gray-400">{day}</div>
  )
}

export default DatePicker;