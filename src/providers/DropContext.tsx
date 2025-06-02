import { Context, createContext } from "react";
import { DropClient } from "./DropHttpClient";

export type DropStateContext = {
  client: Readonly<DropClient>;
};

const DropContext: Context<DropStateContext> = createContext<DropStateContext>(
  {} as DropStateContext
);

export default DropContext;
