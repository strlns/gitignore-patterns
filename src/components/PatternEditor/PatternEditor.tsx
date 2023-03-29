import { Card, Text, Toggle } from "@geist-ui/core";
import Box from "components/Atoms/Box";
import PatternsTextArea from "components/PatternEditor/PatternsMultiLine";
import PatternsSingleLines from "components/PatternEditor/PatternsSingleLines";
import useThemeUnit from "hooks/useUnit";
import { useState } from "react";
import { Dispatch } from "types/AppState";

type PatternEditorProps = {
  patterns: string[];
  dispatch: Dispatch;
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
        {isTextArea ? (
          <PatternsTextArea {...{ patterns, dispatch }} />
        ) : (
          <PatternsSingleLines {...{ patterns, dispatch }} />
        )}

        <Box
          horizontal
          tagName="label"
          alignItems="center"
          style={{
            fontSize: "var(--font-size-sm)",
            marginBottom: unit,
            marginTop: unit,
            cursor: "pointer",
          }}
        >
          <Toggle
            initialChecked={isTextArea}
            checked={isTextArea}
            onChange={(event) => {
              setIsTextArea(event.target.checked);
            }}
            style={{
              marginTop: "0.25ex",
              padding: 0,
            }}
          />
          Use multiline input
        </Box>
      </Card.Body>
    </Card>
  );
};

export default PatternEditor;
