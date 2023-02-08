import classNames from "../../styles/Button.module.css";
import { ReactNode } from "react";
import clsx from "clsx";

type ButtonProps = {
  children?: ReactNode;
  square?: boolean;
  onClick?: React.MouseEventHandler;
} & JSX.IntrinsicAttributes;

const Button = ({ children = <></>, onClick, square = false }: ButtonProps) => {
  return (
    <button
      className={clsx(classNames.button, square && classNames.square)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
