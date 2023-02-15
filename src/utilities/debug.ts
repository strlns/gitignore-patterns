import { isMap } from "lodash-es";

export function logSerialized(values: unknown[] | unknown, label?: string) {
  const valuesToLog = Array.isArray(values) ? values : [values];
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
