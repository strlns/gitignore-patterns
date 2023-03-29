import { Page, Text } from "@geist-ui/core";
import Warning from "components/Error/Warning";
import PatternEditor from "components/PatternEditor/PatternEditor";
import VFileSystemEditor from "components/VFileSystemEditor/VFileSystemEditor";
import { appStateReducer, initialState } from "data/AppStateReducer";
import { processGitignore } from "data/processGitignore";
import { pathsToTree } from "data/VFSTreeFromNodes";
import { useMemo, useReducer } from "react";

function Home() {
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  const filesWithGitignoreData = useMemo(() => {
    return processGitignore(state.files, state.patterns);
  }, [state.files, state.patterns]);

  const tree = useMemo(() => {
    return pathsToTree(filesWithGitignoreData);
  }, [filesWithGitignoreData]);

  const { patterns, error } = state;

  return (
    <Page width="min(100%, 800px)">
      <Text h1>Validate .gitignore patterns</Text>
      {error && (
        <Warning error={error} onClear={() => dispatch({ type: "clearError" })} />
      )}
      <PatternEditor patterns={patterns} dispatch={dispatch} />
      <VFileSystemEditor dispatch={dispatch} tree={tree} />
    </Page>
  );
}

export default Home;
