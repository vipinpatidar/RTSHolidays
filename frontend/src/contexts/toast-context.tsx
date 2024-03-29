import { type ReactNode, createContext, useContext, useState } from "react";
import Toast from "../ui/Toast";

type ToastContextProviderProps = {
  children: ReactNode;
};

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type ToastContextValue = {
  showToastMsg: (toastMessage: ToastMessage) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

// eslint-disable-next-line
export function useToastContext(): ToastContextValue {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("Context should be provide.");
  }
  return context;
}

const ToastContextProvider = ({ children }: ToastContextProviderProps) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

  const context: ToastContextValue = {
    showToastMsg(toastMessage) {
      setToast(toastMessage);
    },
  };

  return (
    <ToastContext.Provider value={context}>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </ToastContext.Provider>
  );
};

//eslint ignore next-line
export default ToastContextProvider;
