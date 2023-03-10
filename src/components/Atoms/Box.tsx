import clsx from "clsx";
import { ForwardedRef, forwardRef, ReactNode } from "react";
import boxStyles from "styles/Box.module.css";

/**
 * Allowed gap values, currently representing multiples of 0.25rem in CSS.
 *
 * This could also be generated using complicated type level recursion, hidden in utility types
 * https://github.com/microsoft/TypeScript/pull/45711
 * ... but that would not be useful IMO, more like obfuscation.
 *  */
type GapValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type BoxProps<TElement extends HTMLElement = HTMLDivElement> = {
  children?: ReactNode[] | ReactNode;
  horizontal?: boolean;
  gap?: GapValue;
  alignItems?: React.CSSProperties["alignItems"];
  justifyContent?: React.CSSProperties["justifyContent"];
} & React.HTMLAttributes<TElement>;

const Box = forwardRef(
  (
    {
      children,
      horizontal = false,
      gap = 2,
      alignItems,
      justifyContent,
      style,
      ...attributeProps
    }: BoxProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const styles = style ?? {};
    alignItems && (styles.alignItems = alignItems);
    justifyContent && (styles.justifyContent = justifyContent);

    const className = clsx({
      [boxStyles.box]: true,
      [boxStyles.h]: horizontal,
      //wow, even this line is exhaustively type-checked for existance of the
      //class in CSS module by typescript-plugin-css-modules and postcss-preset-env in Vite.
      [boxStyles[`g-${gap}`]]: true,
    });

    return (
      <div className={className} ref={ref} style={styles} {...attributeProps}>
        {children}
      </div>
    );
  }
);

Box.displayName = "Box";

export default Box;
