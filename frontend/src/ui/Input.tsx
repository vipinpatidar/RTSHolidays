import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { FieldErrors } from "react-hook-form";
import { RegisterFormData } from "../pages/Register";

type BaseType = {
  id: string;
  label: string;
};

type InputProps = Omit<ComponentPropsWithoutRef<"input">, keyof BaseType> &
  BaseType & { errors?: FieldErrors<RegisterFormData> };
//   type InputProps = Omit<JSX.IntrinsicElements["input"], keyof BaseType> &
//     BaseType;

// Define type for errors object that allows indexing by string keys
type ErrorsType = {
  [key: string]: {
    message: string;
  };
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, errors, ...otherProps }, ref) => {
    const castedErrors = errors as ErrorsType;

    return (
      <div className="flex flex-col gap-[6px] w-full">
        <label
          className="font-semibold uppercase text-gray-700 text-sm"
          htmlFor={id}
        >
          {label}
        </label>
        <input
          ref={ref}
          className="outline-none border rounded w-full py-[6px] px-3 placeholder:text-gray-400"
          id={id}
          {...otherProps}
        />
        {castedErrors && castedErrors[id] && (
          <span className="text-red-500">{castedErrors[id]?.message}</span>
        )}
      </div>
    );
  }
);

export default Input;
