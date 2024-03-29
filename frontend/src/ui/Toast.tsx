import { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-5 left-[50%] -translate-x-1/2 z-50 py-2 px-4 rounded text-white capitalize max-w-[21rem] ${
        type === "SUCCESS" ? " bg-green-500" : " bg-red-500"
      }`}
    >
      <div className="flex justify-center items-center">
        <span className="">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
