import { Button, ButtonProps } from "@geist-ui/core";
import useThemeUnit from "hooks/useUnit";
import { PropsWithChildren } from "react";

export default function SquareButton({
  style,
  ...props
}: PropsWithChildren<ButtonProps>) {
  const unit = useThemeUnit();
  const inlineStyle = {
    aspectRatio: 1,
    padding: "0.25rem",
    width: `calc(2.5 * ${unit})`,
    style,
  };
  return <Button auto style={inlineStyle} {...props} />;
}
