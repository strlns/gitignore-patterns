import Container from "components/Containers/Container";
import Warning from "components/Error/Warning";
import PatternEditor from "components/PatternEditor";
import VFileSystemEditor from "components/VFileSystemEditor";
import { appStateReducer, initialState } from "data/AppStateReducer";
import { pathsToTreeSimple } from "data/VFSTreeFromNodes";
import { useReducer } from "react";

function App() {
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  // const tree = useMemo(() => {
  //   return getTreeFromVFSNodes(state.files);
  // }, [state.files]);

  const tree = pathsToTreeSimple(state.files);

  const { patterns, error } = state;

  return (
    <Container size="lg">
      <h1>.gitignore Pattern</h1>
      {error && (
        <Warning error={error} onClear={() => dispatch({ type: "clearError" })} />
      )}
      <PatternEditor patterns={patterns} dispatch={dispatch} />
      <h2>Your files</h2>
      <VFileSystemEditor tree={tree} dispatch={dispatch} />
    </Container>
  );
}

export default App;
