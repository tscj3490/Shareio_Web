import { RouterProvider } from "react-router-dom";
import { router } from './routers/router'
import { Toaster } from "react-hot-toast";
import "./css/stylev.css";

export const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster containerClassName="toast-container" />
    </>
  );
}

export default App;
