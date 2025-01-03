import { InputHTMLAttributes } from "react";

const Input = ({ ...rest }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className="rounded-lg shadow-md px-2 py-2 text-md focus:outline-none border-[1px] border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
      {...rest}
    />
  );
};

export default Input;
