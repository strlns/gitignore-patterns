import classNames from "../../styles/Button.module.css";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: React.MouseEventHandler;
};

const Button = ({ children = <></>, onClick }: ButtonProps) => {
  return (
    <button className={classNames.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
