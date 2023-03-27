import clsx from "clsx";
import { GapValue } from "styles/GapValue";
import { clone } from "lodash-es";
import { ReactNode } from "react";
import boxStyles from "styles/Box.module.css";
import gapStyles from "styles/GapValues.module.css";

//type TagName = keyof JSX.IntrinsicElements;
type TagName =
  | "div"
  | "nav"
  | "form"
  | "ul"
  | "label"
  | "footer"
  | "h5"
  | "h4"
  | "h3"
  | "h2";

export type BoxProps<T extends TagName = "div"> = {
  children?: ReactNode[] | ReactNode;
  horizontal?: boolean;
  gap?: GapValue;
  flexWrap?: React.CSSProperties["flexWrap"];
  alignItems?: React.CSSProperties["alignItems"];
  justifyContent?: React.CSSProperties["justifyContent"];
  tagName?: T;
} & React.HTMLAttributes<HTMLElementTagNameMap[T]>;

const Box = ({
  children,
  horizontal = false,
  gap = 2,
  flexWrap,
  alignItems,
  justifyContent,
  style,
  tagName = "div",
  className,
  ...attributeProps
}: BoxProps<TagName>) => {
  const TagName = tagName as TagName;
  let styles: React.CSSProperties = style ?? {};
  if (__IS_DEV__) {
    //The need to clone the style object from outside only arises in some edge cases while using HMR.
    //Also, structuredClone is not available in Node 16.
    //const styles: React.CSSProperties = style ? structuredClone(style) : {};
    styles = clone(styles);
  }
  alignItems && (styles.alignItems = alignItems);
  justifyContent && (styles.justifyContent = justifyContent);
  flexWrap && (styles.flexWrap = flexWrap);

  const mergedClassName = clsx(
    boxStyles.box,
    horizontal && boxStyles.h,
    //This is exhaustively type-checked when using the workspace TypeScript version with
    //typescript-plugin-css-modules. Otherwise this line will cause a TS error.
    gapStyles[`g-${gap}`],
    className
  );

  return (
    <TagName className={mergedClassName} style={styles} {...attributeProps}>
      {children}
    </TagName>
  );
};

Box.displayName = "Box";

export default Box;
