import { Button, Page } from "@geist-ui/core";
import { FallbackProps } from "react-error-boundary";

const errorBoundaryFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  console.error("Error caught by error boundary:", error);
  return (
    <Page>
      <h2>Error</h2>
      <p>{JSON.stringify(error)}</p>
      <Button onClick={() => resetErrorBoundary()}>
        OK, let&apos;s carry on anyway!
      </Button>
    </Page>
  );
};

export default errorBoundaryFallback;
