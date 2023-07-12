import { createHashRouter } from "react-router-dom";
import App from "./components/App";
import ErrorElement from "./components/errorElement";
import Landing from "./components/Pages/Landing";
import Team from "./components/Pages/Team";
import Music, { MusicLoader } from "./components/Pages/music";
import Player from "./components/Player/player";
import Info from "./components/Information/Info";

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
        path: "music/:id",
        loader: MusicLoader,
        element: <Music />,
        children: [
          {
            index: true,
            element: <Player />,
          },
          {
            path: "info",
            element: <Info />,
          },
        ],
      },
    ],
    errorElement: <App Outlet={ErrorElement} />,
  },
]);
