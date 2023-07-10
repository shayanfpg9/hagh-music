import { createHashRouter } from "react-router-dom";
import App from "./components/App";
import ErrorElement from "./components/errorElement";

export default createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
      },
      {
        path: "team",
      },
      {
        path: "musics",
      },
      {
        path: "music/:name",
      },
    ],
    errorElement: <App Outlet={ErrorElement} />,
  },
]);
