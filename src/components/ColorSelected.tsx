import { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLSpanElement> {
  color: string;
}

const ColorSelected = ({ color, ...rest }: IProps) => {
  return (
    <span
      style={{ backgroundColor: color }}
      className={`p-1 mb-1 rounded-md text-white`}
      {...rest}
    >{color}</span>
  );
};

export default ColorSelected;
