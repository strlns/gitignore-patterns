import { Button, Grid } from "@geist-ui/core";
import { Action } from "data/AppStateReducer";
import Pattern from "./Pattern";

type PatternEditorProps = {
  patterns: string[];
  dispatch: React.Dispatch<Action>;
};

const PatternEditor = ({ patterns, dispatch }: PatternEditorProps) => {
  return (
    <Grid.Container gap={1} direction="column">
      {patterns.map((pattern, index) => (
        <Grid key={index}>
          <Pattern
            pattern={pattern}
            onChange={(event) =>
              dispatch({
                type: "changePattern",
                payload: { index, pattern: event.currentTarget.value },
              })
            }
            onRemove={() =>
              dispatch({
                type: "removePattern",
                payload: { index },
              })
            }
          />
        </Grid>
      ))}
      <Grid>
        <Button onClick={() => dispatch({ type: "addPattern" })} auto>
          Add line to .gitignore
        </Button>
      </Grid>
    </Grid.Container>
  );
};

export default PatternEditor;
