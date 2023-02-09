import Button from "../Atoms/Button";
import Container from "../Containers/Container";

type WarningProps = {
  error: Error | string;
  onClear: () => void;
};

const Warning = ({ error, onClear }: WarningProps) => {
  const message =
    typeof error === "string"
      ? error
      : error && "message" in error //Not strictly needed if there is no dynamic data passed into this component.
      ? error.message
      : String(error);
  return (
    <Container>
      <p>{message}</p>
      <Button onClick={onClear}>OK</Button>
    </Container>
  );
};

export default Warning;
