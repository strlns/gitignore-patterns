import classNames from "../styles/SpacedList.module.css";
import { ReactNode } from "react";

const SpacedList = ({ children = <></> }: { children: ReactNode }) => {
  return <div className={classNames.spacedList}>{children}</div>;
};

export default SpacedList;
