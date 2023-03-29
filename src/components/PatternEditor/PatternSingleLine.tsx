import { MessageCircle, Trash } from "@geist-ui/icons";
import clsx from "clsx";
import Box from "components/Atoms/Box";
import Input, { InputProps } from "components/Atoms/Input";
import styles from "styles/Pattern.module.css";

type PatternLineProps = {
  pattern: string;
  onChange?: InputProps["onChange"];
  onRemove: () => void;
};

const Pattern = ({ pattern, onChange, onRemove }: PatternLineProps) => {
  const isComment = pattern.match(/^\s*#/);
  return (
    <Box horizontal>
      <Input
        style={{ width: "100%" }}
        className={clsx(isComment && styles.comment)}
        value={pattern}
        onChange={onChange}
        onIconClick={onRemove}
        icon={isComment ? <MessageCircle size={1} /> : null}
        iconRight={
          <span role="button" style={{ pointerEvents: "auto", cursor: "pointer" }}>
            <Trash size={1} />
          </span>
        }
      />
    </Box>
  );
};

export default Pattern;
