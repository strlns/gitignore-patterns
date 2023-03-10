import { Input, InputProps } from "@geist-ui/core";
import { Trash } from "@geist-ui/icons";

type PatternLineProps = {
  pattern: string;
  isValidSyntax?: boolean;
  onChange?: InputProps["onChange"];
  onRemove: () => void;
};

const Pattern = ({ pattern, onChange, onRemove }: PatternLineProps) => {
  return (
    <Input
      value={pattern}
      onChange={onChange}
      onIconClick={onRemove}
      iconRight={
        <span role="button" style={{ pointerEvents: "auto", cursor: "pointer" }}>
          <Trash size={1} />
        </span>
      }
    />
  );
};

export default Pattern;
