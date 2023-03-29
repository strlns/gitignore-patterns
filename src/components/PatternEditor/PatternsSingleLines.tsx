import { Button, Grid } from "@geist-ui/core";
import { Dispatch } from "types/AppState";
import Pattern from "./PatternSingleLine";

type PatternsProps = {
  patterns: string[];
  dispatch: Dispatch;
};

const Patterns = ({ patterns, dispatch }: PatternsProps) => {
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
        <Button
          onClick={() => dispatch({ type: "addPattern" })}
          auto
          scale={0.75}
          px={0.5}
        >
          Add line to .gitignore
        </Button>
      </Grid>
    </Grid.Container>
  );
};

export default Patterns;
