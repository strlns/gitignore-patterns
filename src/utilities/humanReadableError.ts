import { isError, isObject } from "lodash-es";

export default function getErrorMessageFromUnknownError(error: unknown) {
  if (typeof error === "string") {
    return error;
  }
  if (isObject(error) && "message" in error) {
    return String(error.message);
  }
  return String(error);
}

export function getErrorOrMessage(error: unknown): string | Error {
  //lodash's isError handles cases where instanceof would fail.
  if (typeof error === "string" || isError(error)) {
    return error;
  }
  if (isObject(error)) {
    return JSON.stringify(error, null, 2);
  }
  return String(error);
}
