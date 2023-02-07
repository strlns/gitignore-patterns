import classNames from "../../styles/Container.module.css";
import { ReactNode } from "react";
import { clsx } from "clsx";

type ContainerProps = {
  children: ReactNode;
  tagName?: keyof JSX.IntrinsicElements;
  size?: "sm" | "md" | "lg";
  className?: React.CSSProperties;
};

const Container = ({
  children = <></>,
  tagName = "div",
  className,
  size = "lg",
}: ContainerProps) => {
  const HTMLElementTagName = tagName;
  const mergedClassName = clsx(
    classNames.container,
    classNames[size],
    className
  );
  return (
    <HTMLElementTagName className={mergedClassName}>
      {children}
    </HTMLElementTagName>
  );
};

export default Container;
