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
  isFlex = false,
}: {
  children?: ReactNode;
  direction?: Direction;
  isFlex?: boolean;
}) => (
  <div
    className={clsx(
      classNames.spacedList,
      classNamePartsFromProps(direction, isFlex)
    )}
  >
    {children}
  </div>
);

const classNamePartsFromProps = (direction: Direction, isFlex = false) => {
  if (direction === DIRECTIONS.Horizontal) {
    return clsx(classNames.horizontal, isFlex && classNames.flex);
  }
  return null;
};

export default SpacedList;
