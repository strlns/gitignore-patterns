import { useReducer } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Button from "./components/Atoms/Button";
import TextInput from "./components/Atoms/TextInput";
import Container from "./components/Containers/Container";
import SpacedList from "./components/Containers/SpacedList";
import ErrorBoundaryFallback from "./components/Error/ErrorBoundaryFallback";
import Pattern from "./components/Pattern";
import VFileSystemNode from "./components/VFileSystemNode";
import { appStateReducer, initialState } from "./data/AppStateReducer";

function App() {
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  const { files, patterns } = state;

  return (
    <Container>
      <h1>.gitignore Pattern</h1>
      <SpacedList>
        {patterns.map((pattern, index) => (
          <Pattern
            key={index}
            pattern={pattern}
            onChange={(pattern) =>
              dispatch({
                type: "changePattern",
                payload: { index, pattern },
              })
            }
          />
        ))}
      </SpacedList>
      <Button onClick={() => dispatch({ type: "addPattern" })}>
        Add line to .gitignore
      </Button>
      <h2>Your files</h2>
      <SpacedList>
        {files.map((file, index) => (
          <VFileSystemNode
            key={index}
            path={file.path}
            readOnly={file.readOnly}
            onChange={(path) =>
              dispatch({
                type: "changeFilePath",
                payload: { index, path },
              })
            }
            dispatch={dispatch}
          />
        ))}
      </SpacedList>
      <Button onClick={() => dispatch({ type: "addFile" })}>Add file</Button>
    </Container>
  );
}

export default App;
