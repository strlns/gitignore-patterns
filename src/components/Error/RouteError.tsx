import { useRouteError } from "react-router";
import Container from "components/Containers/Container";
import SpacedList from "components/Containers/SpacedList";

export default function RouteError() {
  const error = useRouteError();
  console.error("Route error:", error);
  return (
    <Container>
      <SpacedList>
        <h2>Error</h2>
        <p>{JSON.stringify(error)}</p>
      </SpacedList>
    </Container>
  );
}
