import { IconAlertTriangle, IconCircleX, IconInfoTriangle, IconX } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";

export type SchemeType = "alert" | "info" | "warning";

const colors = {
  alert: "bg-red-200 text-red-700",
  info: "bg-cyan-200 text-cyan-700",
  warning: "bg-orange-200 text-orange-700"
};

const icons = {
  alert: <IconCircleX size={20} />,
  info: <IconInfoTriangle size={20} />,
  warning: <IconAlertTriangle size={20} />
};

export type ToastType = {
  id: number;
  message: string;
  scheme: SchemeType;
}

interface Props extends ToastType {
  close: (id: number) => void
}

const toastTimeout = 8000;

const Toast: React.FC<Props> = ({ id, message, scheme, close }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => handleClose, toastTimeout);
    const fadeInTimer = setTimeout(() => setActive(true), 0);

    return () => {
      clearTimeout(timer);
      clearTimeout(fadeInTimer);
    };
  }, [])

  const handleClose = async () => {
    setActive(false)
    await new Promise((resolve) => setTimeout(resolve, 100));
    close(id);
  }

  return <div className={`flex flex-row items-center gap-4 ${colors[scheme]} ${active ? 'opacity-100' : 'opacity-0'} px-4 py-3 rounded-lg transition-all`}>
    {icons[scheme]}
    <p>{message}</p>
    <button onClick={handleClose}>
      <IconX size={20} />
    </button>
  </div>
}

export default Toast;