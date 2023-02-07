import { useReducer } from "react";
import Button from "./components/Atoms/Button";
import TextInput from "./components/Atoms/TextInput";
import Container from "./components/Containers/Container";
import SpacedList from "./components/Containers/SpacedList";
import { appStateReducer, initialState } from "./data/AppStateReducer";

function App() {
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  console.log(JSON.stringify(state));

  const { files, patterns } = state;

  return (
    <Container>
      <h1>.gitignore Pattern</h1>
      <SpacedList>
        {patterns.map((pattern, index) => (
          <TextInput
            key={index}
            value={pattern}
            onChange={(event) =>
              dispatch({
                type: "changePattern",
                payload: { index, pattern: event.currentTarget.value },
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
        {/*Next up: decide between own implementation of tree UI or a pre-made lib.*/}
        {files.map((file, index) => (
          <TextInput
            key={index}
            value={file.path}
            readOnly={file.readOnly}
            onChange={(event) =>
              dispatch({
                type: "changePattern",
                payload: { index, pattern: event.currentTarget.value },
              })
            }
          />
        ))}
      </SpacedList>
      <Button onClick={() => dispatch({ type: "addFile" })}>Add file</Button>
    </Container>
  );
}

export default App;
