import { ButtonProps } from "@geist-ui/core";
import { PropsWithChildren } from "react";
import SquareButton from "components/Atoms/SquareButton";
import styles from "styles/TooltipButton.module.css";

export default function TooltipButton({
  style,
  ...props
}: PropsWithChildren<ButtonProps>) {
  return <SquareButton className={styles.btn} style={style} {...props} />;
}
