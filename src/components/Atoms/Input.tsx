import { InputProps as GeistInputProps, Input as GeistInput } from "@geist-ui/core";
import clsx from "clsx";
import { forwardRef } from "react";
import styles from "styles/Input.module.css";

export type InputProps = { fullWidth?: boolean } & GeistInputProps;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ fullWidth = true, className, ...props }: InputProps, ref) => {
    return (
      <GeistInput
        ref={ref}
        style={{ width: "100%" }}
        {...props}
        className={clsx(styles.wrap, fullWidth && styles.full, className)}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
