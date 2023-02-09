import { useMemo, useReducer } from "react";
import Container from "../components/Containers/Container";
import Warning from "../components/Error/Warning";
import PatternEditor from "../components/PatternEditor";
import VFileSystemEditor from "../components/VFileSystemEditor";
import { appStateReducer, initialState } from "../data/AppStateReducer";
import { getTreeFromVFSNodes } from "../data/getTreeFromVFSNodes";

function App() {
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  const tree = useMemo(() => getTreeFromVFSNodes(state.files), [state.files]);

  const sortedFiles = useMemo(() => {
    const result = [];
    for (const [_parentPath, vfsNode] of tree.entries()) {
      result.push(vfsNode);
    }
    return result.flat();
  }, [tree]);

  const { files, patterns, error } = state;

  return (
    <Container>
      <h1>.gitignore Pattern</h1>
      {error && (
        <Warning
          error={error}
          onClear={() => dispatch({ type: "clearError" })}
        />
      )}
      <PatternEditor patterns={patterns} dispatch={dispatch} />
      <h2>Your files</h2>
      <VFileSystemEditor files={sortedFiles} dispatch={dispatch} />
    </Container>
  );
}

export default App;
