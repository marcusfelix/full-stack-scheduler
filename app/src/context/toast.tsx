import React, { ReactNode, useContext, useState } from "react";
import Toast, { SchemeType, ToastType } from "../components/Toast/Toast";

interface ToastContextType {
  show: (message: string, scheme: SchemeType) => void;
}

type Props = {
  children: ReactNode
}

export const ToastContext = React.createContext<ToastContextType>(null as unknown as ToastContextType)

export const ToastProvider: React.FC<Props> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const show = async (message: string, scheme?: SchemeType) => {
    setToasts((e) => [...e, ...[{
      id: e.length + 1,
      message,
      scheme
    } as ToastType]]);
  }

  const hide = (id: number) => {
    setToasts((e) => e.filter((e) => e.id !== id))
  }

  const value = {
    show
  }

  return <ToastContext.Provider value={value}>
    <div className="fixed flex flex-col gap-4 bottom-8 right-8">
      {toasts.map((toast, i) => <Toast
        {...toast}
        close={hide}
        key={i}
      />)}
    </div>
    {children}
  </ToastContext.Provider>
}

export const useToast = () => useContext(ToastContext);