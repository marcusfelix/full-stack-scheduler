import { IconAlertTriangle, IconCircleX, IconInfoTriangle, IconX } from "@tabler/icons-react";
import React, { ReactNode, useContext, useState } from "react";

interface ToastContextType {
  show: (message: string, scheme: SchemeType) => void;
}

type Props = {
  children: ReactNode
}

type SchemeType = "alert" | "info" | "warning";

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

const toastTimeout = 8000;

export const ToastContext = React.createContext<ToastContextType>(null as unknown as ToastContextType)

export const ToastProvider: React.FC<Props> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [scheme, setScheme] = useState<SchemeType>("alert");

  const show = async (message: string, scheme?: SchemeType) => {
    setScheme(scheme ?? "alert");
    setMessage(message);
    setTimeout(() => setIsShowing(true), 0);
    setTimeout(() => hide(), toastTimeout)
  }

  const hide = () => {
    setIsShowing(false)
    setTimeout(() => setMessage(null), 300)
  }

  const value = {
    show
  }

  return <ToastContext.Provider value={value}>
    {message ? <div className={`fixed bottom-10 right-10 flex flex-row items-center gap-4 ${colors[scheme]} px-4 py-3 rounded-lg ${isShowing ? 'opacity-100' : 'opacity-0'} transition-all`}>
      {icons[scheme]}
      <p>{message}</p>
      <button onClick={hide}>
        <IconX size={20} />
      </button>
    </div> : null}
    {children}
  </ToastContext.Provider>
}

export const useToast = () => useContext(ToastContext);