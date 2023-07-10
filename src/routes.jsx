import { createHashRouter } from "react-router-dom";
import App from "./components/App";
import ErrorElement from "./components/errorElement";
import Landing from "./components/Pages/Landing";

export default createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Landing />,
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
