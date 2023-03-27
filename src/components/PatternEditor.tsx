import { Button, Card, Grid, Text, Toggle, Tooltip } from "@geist-ui/core";
import { InfoFill } from "@geist-ui/icons";
import { Action } from "data/AppStateReducer";
import useThemeUnit from "hooks/useUnit";
import { useState } from "react";
import Box from "./Atoms/Box";
import Pattern from "./Pattern";

type PatternEditorProps = {
  patterns: string[];
  dispatch: React.Dispatch<Action>;
};

const PatternEditor = ({ patterns, dispatch }: PatternEditorProps) => {
  const [isTextArea, setIsTextArea] = useState(false);

  const unit = useThemeUnit();
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
          <Box
            horizontal
            tagName="label"
            alignItems="center"
            style={{ marginBottom: unit, marginTop: unit }}
          >
            <Toggle
              initialChecked={isTextArea}
              checked={isTextArea}
              disabled
              onChange={(event) => {
                setIsTextArea(event.target.checked);
              }}
              style={{
                marginTop: "0.25ex",
                padding: 0,
              }}
            />
            Use multiline input{" "}
            <Tooltip text="Not implemented yet" style={{ display: "inline-flex" }}>
              <InfoFill />
            </Tooltip>
          </Box>
        </Grid.Container>
      </Card.Body>
    </Card>
  );
};

export default PatternEditor;
