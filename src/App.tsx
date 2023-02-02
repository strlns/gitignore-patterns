import { useState } from "react";
import TextInput from "./components/TextInput";
import "./styles/App.css";

function App() {
  const [patterns, setPatterns] = useState([""]);

  const setPattern = (index: number, pattern: string) => {
    setPatterns((patterns) => {
      const newPatterns = [...patterns];
      newPatterns[index] = pattern;
      return newPatterns;
    });
  };

  const addPattern = () => {
    setPatterns((patterns) => [...patterns, ""]);
  };

  const [files, setFiles] = useState([""]);

  const setFile = (index: number, filename: string) => {
    setFiles((files) => {
      const newFiles = [...files];
      newFiles[index] = filename;
      return newFiles;
    });
  };

  const addFile = () => {
    setFiles((files) => [...files, ""]);
  };

  return (
    <div className="App">
      <h1>.gitignore Pattern</h1>
      <div style={{ display: "grid", gap: "1rem", gridAutoFlow: "row" }}>
        {patterns.map((pattern, index) => (
          <TextInput
            key={index}
            value={pattern}
            onChange={(event) => setPattern(index, event.target.value)}
          />
        ))}
      </div>
      <button onClick={addPattern}>Add line to .gitignore</button>
      <h2>Your files</h2>
      <div style={{ display: "grid", gap: "1rem", gridAutoFlow: "row" }}>
        {files.map((file, index) => (
          <TextInput
            key={index}
            value={file}
            onChange={(event) => setPattern(index, event.target.value)}
          />
        ))}
      </div>
      <button onClick={addFile}>Add file</button>
    </div>
  );
}

export default App;
