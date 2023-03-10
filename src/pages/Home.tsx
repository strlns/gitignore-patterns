import { Card, Text, Page } from "@geist-ui/core";
import Warning from "components/Error/Warning";
import PatternEditor from "components/PatternEditor";
import VFileSystemEditor from "components/VFileSystemEditor";
import { appStateReducer, initialState } from "data/AppStateReducer";
import { pathsToTree } from "data/VFSTreeFromNodes";
import { useMemo, useReducer } from "react";

function Home() {
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  const tree = useMemo(() => {
    return pathsToTree(state.files);
  }, [state.files]);

  const { patterns, error } = state;

  return (
    <Page width="800px">
      <Text h1>Validate .gitignore patterns</Text>
      <Card mb={1}>
        <Card.Content py={0}>
          <Text h3 mb={0}>
            .gitignore
          </Text>
        </Card.Content>
        {error && (
          <Card.Content py={0}>
            <Warning error={error} onClear={() => dispatch({ type: "clearError" })} />
          </Card.Content>
        )}
        <Card.Body>
          <PatternEditor patterns={patterns} dispatch={dispatch} />
        </Card.Body>
      </Card>
      <Card>
        <Card.Content py={0}>
          <Text h3 mb={0}>
            Your files
          </Text>
        </Card.Content>
        <Card.Body>
          <VFileSystemEditor tree={tree} dispatch={dispatch} />
        </Card.Body>
      </Card>
    </Page>
  );
}

export default Home;
