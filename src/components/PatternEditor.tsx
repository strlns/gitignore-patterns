import { Button, Card, Grid, Text } from "@geist-ui/core";
import { Action } from "data/AppStateReducer";
import Pattern from "./Pattern";

type PatternEditorProps = {
  patterns: string[];
  dispatch: React.Dispatch<Action>;
};

const PatternEditor = ({ patterns, dispatch }: PatternEditorProps) => {
  return (
    <Card mb={1}>
      <Card.Content py={0}>
        <Text h3 mb={0}>
          .gitignore
        </Text>
      </Card.Content>
      <Card.Body>
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
      </Card.Body>
    </Card>
  );
};

export default PatternEditor;
