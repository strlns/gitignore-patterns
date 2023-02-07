import classNames from "../../styles/SpacedList.module.css";
import { ReactNode } from "react";
import clsx from "clsx";

export const DIRECTIONS = {
  Vertical: 0,
  Horizontal: 1,
} as const;

type Direction = typeof DIRECTIONS[keyof typeof DIRECTIONS];

const SpacedList = ({
  children = <></>,
  direction = DIRECTIONS.Vertical,
}: {
  children?: ReactNode;
  direction?: Direction;
}) => (
  <div className={clsx(classNames.spacedList, directionClassName(direction))}>
    {children}
  </div>
);

const directionClassName = (direction: Direction) => {
  if (direction === DIRECTIONS.Horizontal) {
    return classNames.horizontal;
  }
  return null;
};

export default SpacedList;
