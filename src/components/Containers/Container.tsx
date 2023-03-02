import { clsx } from "clsx";
import { ReactNode } from "react";
import classNames from "styles/Container.module.css";

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
  const mergedClassName = clsx(classNames.container, classNames[size], className);
  return <HTMLElementTagName className={mergedClassName}>{children}</HTMLElementTagName>;
};

export default Container;
