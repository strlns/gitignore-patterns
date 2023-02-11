import { Action } from "data/AppStateReducer";
import Button from "./Atoms/Button";
import SpacedList from "./Containers/SpacedList";
import Pattern from "./Pattern";

type PatternEditorProps = {
  patterns: string[];
  dispatch: React.Dispatch<Action>;
};

const PatternEditor = ({ patterns, dispatch }: PatternEditorProps) => {
  return (
    <>
      <SpacedList>
        {patterns.map((pattern, index) => (
          <Pattern
            key={index}
            pattern={pattern}
            onChange={(pattern) =>
              dispatch({
                type: "changePattern",
                payload: { index, pattern },
              })
            }
          />
        ))}
      </SpacedList>
      <Button onClick={() => dispatch({ type: "addPattern" })}>
        Add line to .gitignore
      </Button>
    </>
  );
};

export default PatternEditor;
