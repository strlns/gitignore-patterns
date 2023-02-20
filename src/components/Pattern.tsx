import { ChangedValueHandler } from "../types/ChangedValueHandler";
import TextInput from "./Atoms/TextInput";
import SpacedList, { DIRECTIONS } from "./Containers/SpacedList";

type PatternLineProps = {
  pattern: string;
  isValidSyntax?: boolean;
  onChange?: ChangedValueHandler;
};

const Pattern = ({ pattern, onChange }: PatternLineProps) => {
  return (
    <SpacedList direction={DIRECTIONS.Horizontal}>
      <TextInput value={pattern} onChange={onChange} />
    </SpacedList>
  );
};

export default Pattern;
