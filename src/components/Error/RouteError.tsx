import { Card, Code, Grid, Page } from "@geist-ui/core";
import { isError } from "lodash-es";
import { useRouteError } from "react-router";
import { Link } from "react-router-dom";
import { routePaths } from "routes";
import { getErrorOrMessage } from "utilities/humanReadableError";

export default function RouteError() {
  const error = useRouteError();
  const normalizedError = getErrorOrMessage(error);
  const isErrorObject = isError(normalizedError);
  return (
    <Page>
      <Grid.Container gap={2} direction="column">
        <>
          <Grid>
            <h2>Error: {isErrorObject ? normalizedError.message : normalizedError}</h2>
          </Grid>
          <Grid>
            <Link to={routePaths.Home}>Return to app</Link>
          </Grid>
          {isErrorObject && (
            <Grid xs>
              <Card shadow width="100%">
                <h3>Stack</h3>
                <Code block style={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}>
                  {normalizedError.stack}
                </Code>
              </Card>
            </Grid>
          )}
        </>
      </Grid.Container>
    </Page>
  );
}
