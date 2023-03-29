import { Grid, Textarea } from "@geist-ui/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Dispatch } from "types/AppState";

type PatternsProps = {
  patterns: string[];
  dispatch: Dispatch;
};

const Patterns = ({ patterns, dispatch }: PatternsProps) => {
  const [ignoreContents, setIgnoreContents] = useState(patterns.join(`\n`));

  const onChange = useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>((event) => {
    setIgnoreContents(event.currentTarget.value);
  }, []);

  const lines = useMemo(() => ignoreContents.split(/\r?\n\s*/), [ignoreContents]);

  useEffect(() => {
    for (const [index, pattern] of lines.entries()) {
      if (index >= patterns.length) {
        dispatch({ type: "addPattern", payload: { pattern } });
      } else if (patterns[index] !== pattern) {
        console.log(patterns.length, index);

        //This also covers line deletion, we iterate over all lines anyway, not relevant for perf. here
        dispatch({ type: "changePattern", payload: { index, pattern } });
      }
    }
  }, [lines]);

  return (
    <Grid.Container gap={1} direction="column">
      <Grid>
        <Textarea
          value={ignoreContents}
          onChange={onChange}
          width="100%"
          resize="both"
          height={9}
        />
      </Grid>
    </Grid.Container>
  );
};

export default Patterns;
