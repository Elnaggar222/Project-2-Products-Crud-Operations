import { ButtonHTMLAttributes, memo } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  width?: "w-full" | "w-fit";
}

const Button = ({ children, width = "w-full", className, ...rest }: IProps) => {
  return (
    <button
      className={`p-2 rounded-lg text-white font-medium ${className} ${width}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default memo(Button);
