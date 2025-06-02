import DropContext from "./DropContext";
import createDropClient from "./DropHttpClient";
import { ReactNode } from "react";

const DropProvider = ({ children }: { children: ReactNode }) => {
    const client = createDropClient();
    
  return (
    <DropContext value={{ client }}>
      {children}
    </DropContext>
  );
};

export default DropProvider;