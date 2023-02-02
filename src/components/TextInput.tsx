export type TextInputProps = {
  value: string | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const TextInput = ({ value, onChange }: TextInputProps) => {
  return <input type="text" />;
};

export default TextInput;
