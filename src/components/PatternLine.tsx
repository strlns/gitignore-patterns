import TextInput from "./TextInput";

type PatternLineProps = {
  dispatch: React.Dispatch;
};

const PatternLine = ({ pattern, isInvalid }: PatternLineProps) => {
  const onChange: React.KeyboardEventHandler = (event) => {};

  return (
    <>
      <TextInput value={pattern} onChange={onChange} />
    </>
  );
};
