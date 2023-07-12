import { createHashRouter } from "react-router-dom";
import App from "./components/App";
import ErrorElement from "./components/errorElement";
import Landing from "./components/Pages/Landing";
import Team from "./components/Pages/Team";
import Music, { MusicLoader } from "./components/Pages/Music";
import Player from "./components/Player/player";
import Info from "./components/Information/Info";
import Musics, { AllMusicsLoader } from "./components/Pages/AllMusics";

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
        loader: AllMusicsLoader,
        element: <Musics />,
      },
      {
        path: "music/:id",
        loader: MusicLoader,
        element: <Music />,
        children: [
          {
            index: true,
            element: <Info />,
          },

          {
            path: "play",
            element: <Player />,
          },
        ],
      },
    ],
    errorElement: <App Outlet={ErrorElement} />,
  },
]);
