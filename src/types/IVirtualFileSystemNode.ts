import { PartialBy } from "types/UtilityTypes";

export interface IVirtualFileSystemNode {
  path: string;
  isDir: boolean;
  /*In this app, the user cannot remove the root directory of his virtual 
  git repository.*/
  readonly readOnly?: boolean; //treated as false by default
  duplicate?: boolean; //treated as false by default
  /*Because collisions cause problems in some scenarios,
  this is filled using @paralleldrive/cuid2*/
  id: string;
  createdAt: Date;
  isIgnored: boolean;
  isInvalid?: boolean;
}

export interface Directory extends IVirtualFileSystemNode {
  isDir: true;
  // To do: Can TS define a string type that must end with a slash? Looks like this is not possible,
  // but would be nice combined with a type predicate https://github.com/microsoft/TypeScript/issues/6579
  path: string;
}

export type FileWithoutID = PartialBy<IVirtualFileSystemNode, "id">;
