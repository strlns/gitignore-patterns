import { Grid, Page } from "@geist-ui/core";
import { useRouteError } from "react-router";

export default function RouteError() {
  const error = useRouteError();
  console.error("Route error:", error);
  return (
    <Page>
      <Grid.Container gap={2}>
        <h2>Error</h2>
        <p>{JSON.stringify(error)}</p>
      </Grid.Container>
    </Page>
  );
}
