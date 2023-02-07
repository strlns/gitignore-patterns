export type TextInputProps = {
  value: string | undefined;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
} & React.HTMLAttributes<HTMLInputElement>;

const TextInput = ({
  value,
  onChange,
  readOnly = false,
  ...props
}: TextInputProps) => {
  const wrappedOnChange = readOnly ? onChange : () => void 0;
  return (
    <input
      type="text"
      value={value ?? ""}
      onChange={onChange}
      readOnly={readOnly}
      {...props}
    />
  );
};

export default TextInput;
