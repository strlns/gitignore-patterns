import SpacedList, { DIRECTIONS } from "./Containers/SpacedList";

type PatternLineProps = {
  pattern: string;
  isValidSyntax: boolean;
};

const PatternLine = ({ pattern, isValidSyntax }: PatternLineProps) => {
  return <SpacedList direction={DIRECTIONS.Horizontal}></SpacedList>;
};
