import { FallbackProps } from "react-error-boundary";

export default function ({ error }: FallbackProps) {
  return <p>{error.message ?? "Error."}</p>;
}
