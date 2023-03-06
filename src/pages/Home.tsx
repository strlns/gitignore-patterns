import { Grid, Page } from "@geist-ui/core";
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
      <h1>Validate .gitignore patterns</h1>
      {error && (
        <Warning error={error} onClear={() => dispatch({ type: "clearError" })} />
      )}
      <PatternEditor patterns={patterns} dispatch={dispatch} />
      <h2>Your files</h2>
      <VFileSystemEditor tree={tree} dispatch={dispatch} />
    </Page>
  );
}

export default Home;
