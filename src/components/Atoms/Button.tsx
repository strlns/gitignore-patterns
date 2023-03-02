import clsx from "clsx";
import { ReactNode } from "react";
import classNames from "styles/Button.module.css";

type ButtonProps = {
  children?: ReactNode;
  square?: boolean;
  onClick?: React.MouseEventHandler;
} & React.HTMLAttributes<HTMLButtonElement>;

const Button = ({
  children = <></>,
  onClick,
  square = false,
  className,
  ...attributes
}: ButtonProps) => {
  return (
    <button
      className={clsx(classNames.button, square && classNames.square, className)}
      onClick={onClick}
      {...attributes}
    >
      {children}
    </button>
  );
};

export default Button;
