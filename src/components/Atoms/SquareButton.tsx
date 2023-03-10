import { Button, ButtonProps } from "@geist-ui/core";
import { PropsWithChildren } from "react";

export default function SquareButton({ ...props }: PropsWithChildren<ButtonProps>) {
  const inlineStyle = { aspectRatio: 1, padding: "0.25rem", ...props.style };
  return <Button auto style={inlineStyle} {...props} />;
}
