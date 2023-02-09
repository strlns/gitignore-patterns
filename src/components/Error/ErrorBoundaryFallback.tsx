import { FallbackProps } from "react-error-boundary";
import Button from "../Atoms/Button";
import Container from "../Containers/Container";
import SpacedList from "../Containers/SpacedList";

export default function ({ error, resetErrorBoundary }: FallbackProps) {
  console.error("Error caught by error boundary:", error);
  return (
    <Container>
      <SpacedList>
        <h2>Error</h2>
        <p>{JSON.stringify(error)}</p>
        <Button onClick={() => resetErrorBoundary()}>
          OK, let's carry on anyway!
        </Button>
      </SpacedList>
    </Container>
  );
}
