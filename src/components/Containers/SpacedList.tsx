import clsx from "clsx";
import { ReactNode } from "react";
import classNames from "styles/SpacedList.module.css";

export const DIRECTIONS = {
  Vertical: 0,
  Horizontal: 1,
} as const;

type DirectionValue = (typeof DIRECTIONS)[keyof typeof DIRECTIONS];

export const SPACINGS = {
  Normal: 0,
  Tight: 1,
  Loose: 2,
} as const;

type SpacingValue = (typeof SPACINGS)[keyof typeof SPACINGS];

type SpacedListProps = {
  children?: ReactNode;
  direction?: DirectionValue;
  flex?: boolean;
  spacing?: SpacingValue;
} & React.HTMLAttributes<HTMLDivElement>;

const SpacedList = ({
  children = <></>,
  direction = DIRECTIONS.Vertical,
  spacing = SPACINGS.Normal,
  flex = false,
  ...attributes
}: SpacedListProps) => (
  <div
    className={clsx(
      classNames.spacedList,
      classNamePartsFromProps(direction, flex, spacing)
    )}
    {...attributes}
  >
    {children}
  </div>
);

const classNamePartsFromProps = (
  direction: DirectionValue,
  isFlex: boolean,
  spacing: SpacingValue
) => {
  if (direction === DIRECTIONS.Horizontal) {
    return clsx(
      classNames.horizontal,
      isFlex && classNames.flex,
      spacingClassName(spacing)
    );
  }
  return;
};

const spacingClassName = (spacing: SpacingValue) => {
  switch (spacing) {
    case SPACINGS.Tight:
      return classNames.tight;
    case SPACINGS.Loose:
      return classNames.loose;
    default:
      return;
  }
};

export default SpacedList;
