import { useMemo, useState } from "react";
import {
  isRouteErrorResponse,
  useLocation,
  useNavigate,
  useParams,
  useRouteError,
} from "react-router-dom";

import config from "../assets/config/config.json";
import musics from "../assets/config/musics.json";
import albums from "../assets/config/albums.json";

export default function useConfig() {
  const $ = (query) => document.querySelector(query);
  const location = useLocation();
  const [page, setPage] = useState();
  const params = useParams();
  const error = useRouteError();
  const navigate = useNavigate();

  useMemo(() => {
    window.onkeyup = ({ key }) => {
      if (key === "Escape") {
        navigate(-1);
      }
    };

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

      case "/albums":
        setPage("albums");
        break;

      default:
        setPage("error");
        break;
    }

    if (location.pathname.includes("/music/")) {
      setPage("music");
    }

    if (location.pathname.includes("/album/")) {
      setPage("album");
    }

    if (isRouteErrorResponse(error)) {
      setPage("error");
    }
  }, [location, error]);

  if (page) {
    $("title").innerHTML =
      config.home.title + (page !== "home" ? " - " + config[page].title : "");

    $("meta[name=description]").setAttribute(
      "content",
      config[page].description
    );

    if (page === "music" && params.id) {
      const music = musics.find((v) => v.id === params.id);

      if (music.keywords) {
        $("meta[name=keywords]").setAttribute(
          "content",
          [...config.keywords, ...music.keywords].join(", ")
        );
      }

      $("meta[name=description]").setAttribute(
        "content",
        config[page].description
          .replace(/%NAME%/g, music.name)
          .replace(/%SINGER%/g, music.singer)
      );

      $("title").innerHTML += " " + music.name;
    }

    if (page === "album" && params.album) {
      const album = albums.find((v) => v.id === params.album);

      if (album.keywords) {
        $("meta[name=keywords]").setAttribute(
          "content",
          [...config.keywords, ...album.keywords].join(", ")
        );
      }

      $("meta[name=description]").setAttribute(
        "content",
        config[page].description
          .replace(/%NAME%/g, album.name)
          .replace(/%PRODUCER%/g, album.producer)
      );

      $("title").innerHTML += " " + album.name;
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
