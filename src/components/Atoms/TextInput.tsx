import clsx from "clsx";
import classNames from "../../styles/TextInput.module.css";
import { ChangedValueHandler } from "../../types/ChangedValueHandler";

export type TextInputProps = {
  value: string | undefined;
  onChange?: ChangedValueHandler;
  readOnly?: boolean;
  className?: React.HTMLAttributes<HTMLInputElement>["className"];
} & Omit<React.HTMLAttributes<HTMLInputElement>, "onChange">;

const TextInput = ({
  value,
  onChange,
  readOnly = false,
  className = "",
  ...props
}: TextInputProps) => {
  return (
    <input
      type="text"
      value={value ?? ""}
      onChange={valueHandlerToEventHandler(onChange)}
      readOnly={readOnly}
      className={clsx(classNames.input, className)}
      {...props}
    />
  );
};

export const valueHandlerToEventHandler = (
  handler?: ChangedValueHandler
): React.ChangeEventHandler<HTMLInputElement> => {
  if (!handler) {
    return () => void 0;
  }
  return (event) => {
    handler(event.currentTarget.value);
  };
};

export default TextInput;
