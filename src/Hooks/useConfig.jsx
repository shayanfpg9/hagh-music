import { useMemo, useState } from "react";
import {
  isRouteErrorResponse,
  useLocation,
  useParams,
  useRouteError,
} from "react-router-dom";

import config from "../assets/config/config.json";
import musics from "../assets/config/musics.json";

export default function useConfig() {
  const $ = (query) => document.querySelector(query);
  const location = useLocation();
  const [page, setPage] = useState();
  const params = useParams();
  const error = useRouteError();

  useMemo(() => {
    switch (location.pathname) {
      case "/":
        setPage("home");
        break;

      case "/team":
        setPage("team");
        break;

      case "/musics":
        setPage("musics");
        break;

      default:
        setPage("error");
        break;
    }

    if (location.pathname.includes("/music/")) {
      setPage("music");
    }

    if (isRouteErrorResponse(error)) {
      setPage("error");
    }
  }, [location]);

  if (page) {
    $("title").innerHTML =
      config.home.title + (page !== "home" ? " - " + config[page].title : "");

    $("meta[name=description]").setAttribute(
      "content",
      config[page].description
    );

    if (page === "music" && params.id) {
      const music = musics.find((v) => v.id === params.id);

      $("meta[name=keywords]").setAttribute(
        "content",
        [...config.keywords, ...music?.keywords].join(", ")
      );

      $("meta[name=description]").setAttribute(
        "content",
        config[page].description
          .replace(/%NAME%/g, music.name)
          .replace(/%SINGER%/g, music.singer)
      );

      $("title").innerHTML += " " + music.name;
    }

    if (page !== "error") {
      $("meta[name=keywords]").setAttribute(
        "content",
        config.keywords.join(", ")
      );
    } else {
      $("meta[name=keywords]").setAttribute(
        "content",
        [config.name, "ارور " + (error.status || 500), error.statusText].join(
          ", "
        )
      );
    }
  }
}
