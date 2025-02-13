import { HTMLAttributes, memo } from "react";

interface IProps extends HTMLAttributes<HTMLSpanElement> {
  color: string;
}

const ColorItem = ({ color, ...rest }: IProps) => {
  return (
    <span
      style={{ backgroundColor: color }}
      className={`w-5 h-5 rounded-full flex-shrink-0 cursor-pointer mb-1`}
      {...rest}
    />
  );
};

export default memo(ColorItem);
