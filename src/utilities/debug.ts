import { isMap } from "lodash-es";

const isIterable = (values: unknown): values is Iterable<unknown> =>
  Boolean(values) &&
  typeof (values as Record<string | symbol, unknown>)[Symbol.iterator] === "function";

export function logSerialized(values: unknown[] | unknown, label?: string) {
  const valuesToLog = isIterable(values) ? Array.from(values) : [values];
  const makeGroup = valuesToLog.length > 1 || label !== undefined;
  if (makeGroup) {
    console.group(label ?? "");
  }
  valuesToLog.forEach((value) => {
    let serializedValue = value;
    if (isMap(serializedValue)) {
      serializedValue = serializedValue[Symbol.iterator]();
    }
    console.log(`%c ${JSON.stringify(serializedValue, undefined, 2)}`, "color: orange");
  });
  if (makeGroup) {
    console.groupEnd();
  }
}
