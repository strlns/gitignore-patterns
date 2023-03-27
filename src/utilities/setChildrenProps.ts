import React, { ReactNode } from "react";
/*
 * This is taken from geist-ui's source code.
 * https://github.com/geist-org/geist-ui/blob/9e5ceed6b69b3af0f59e453c2b18427f57210d1f/components/utils/collections.ts#L78
 *
 * Extended with ability to recurse a whole tree of children.
 */
export const setChildrenProps = (
  children: ReactNode | undefined,
  props: Record<string, unknown>,
  targetComponents: Array<React.ElementType> = []
): ReactNode | undefined => {
  if (React.Children.count(children) === 0) return [];
  const allowAll = targetComponents.length === 0;
  const clone = (child: React.ReactElement, props = {}) =>
    React.cloneElement(child, props);

  return recursiveMap(children, (item) => {
    if (!React.isValidElement(item)) return item;
    if (allowAll) return clone(item, props);

    const isAllowed = targetComponents.find((child) => child === item.type);
    if (isAllowed) return clone(item, props);
    return item;
  });
};

function recursiveMap(children: React.ReactNode, fn: (node: ReactNode) => ReactNode) {
  return React.Children.map(children, (child): ReactNode => {
    if (!React.isValidElement(child)) {
      return child;
    }
    if (child.props.children) {
      child = React.cloneElement(child, {}, recursiveMap(child.props.children, fn));
    }
    return fn(child);
  });
}
