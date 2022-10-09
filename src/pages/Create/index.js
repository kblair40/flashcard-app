import Create from "./Create";
import { SetProvider } from "store/SetContext";

const WithContext = () => {
  return (
    <SetProvider>
      <Create />
    </SetProvider>
  );
};

export default WithContext;
