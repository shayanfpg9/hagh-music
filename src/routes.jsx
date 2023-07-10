import { createHashRouter } from "react-router-dom";
import App from "./components/App";
import ErrorElement from "./components/errorElement";
import Landing from "./components/Pages/Landing";
import Team from "./components/Pages/Team";

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
        element: <Team />,
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
