import { Link, LinkProps } from "@geist-ui/core";
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";
import clsx from "clsx";
import { GapValue } from "styles/GapValue";
import { PropsWithChildren, ReactNode } from "react";
import iconLinkStyles from "styles/IconLink.module.css";
import gapStyles from "styles/GapValues.module.css";
import { setChildrenProps } from "utilities/setChildrenProps";

type IconLinkProps = {
  iconLeft?: JSX.Element | null;
  iconLeftAuto?: boolean;
  iconLeftStyles?: React.CSSProperties;
  arrowRight?: boolean;
  gap?: GapValue;
} & (Omit<LinkProps, "icon"> | RouterLinkProps);

export default function IconLink({
  iconLeft = null,
  iconLeftAuto = false,
  iconLeftStyles,
  arrowRight = true,
  children,
  gap,
  ...linkProps
}: PropsWithChildren<IconLinkProps>) {
  let Icon: ReactNode;
  if (iconLeft) {
    const propsToSet: React.HTMLProps<JSX.Element> & Record<string, unknown> = {
      className: iconLinkStyles.iconLeft,
    };
    if (iconLeftStyles) {
      propsToSet.style = iconLeftStyles;
    }
    Icon = setChildrenProps(iconLeft, propsToSet);
  }
  return isRouterLink(linkProps) ? (
    <RouterLink
      style={{ alignItems: "center" }}
      className={clsx(
        iconLinkStyles.iconLink,
        iconLeftAuto && iconLinkStyles.leftAuto,
        gap && gapStyles[`g-${gap}`]
      )}
      {...linkProps}
    >
      {Icon}
      <span className={iconLinkStyles.text}>{children}</span>
    </RouterLink>
  ) : (
    <Link
      icon={arrowRight}
      style={{ alignItems: "center" }}
      className={clsx(
        iconLinkStyles.iconLink,
        iconLeftAuto && iconLinkStyles.leftAuto,
        gap && gapStyles[`g-${gap}`]
      )}
      {...linkProps}
      color={Boolean(linkProps.color) as boolean}
    >
      {Icon}
      <span className={iconLinkStyles.text}>{children}</span>
    </Link>
  );
}

const isRouterLink = (
  restProps: LinkProps | RouterLinkProps
): restProps is RouterLinkProps => {
  return "to" in restProps;
};
