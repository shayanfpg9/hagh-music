// Assets:
import { ReactComponent as PlaySvg } from "../../assets/images/play.svg";
import { ReactComponent as PauseSvg } from "../../assets/images/pause.svg";
import { ReactComponent as TsRSvg } from "../../assets/images/5s-r.svg";
import { ReactComponent as TsLSvg } from "../../assets/images/5s-l.svg";
import { ReactComponent as MuteSvg } from "../../assets/images/mute.svg";
import { ReactComponent as Volume1Svg } from "../../assets/images/volume-1.svg";
import { ReactComponent as Volume2Svg } from "../../assets/images/volume-2.svg";
import { ReactComponent as Volume3Svg } from "../../assets/images/volume-3.svg";
import { ReactComponent as ShareSvg } from "../../assets/images/share.svg";
import { ReactComponent as DownloadSvg } from "../../assets/images/download.svg";
import { ReactComponent as InfoSvg } from "../../assets/images/info.svg";

// Deps:
import {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import MusicContext from "../../contexts/Music";

// Functions:
import PlayerReducer from "./actions";
import formatTime from "./FormatTime";
import share from "./share";
import assignShortcuts from "./assignShortcuts";

export default function Player() {
  const music = useContext(MusicContext);

  const audio = useRef(new Audio(music.path));
  const first = useRef(true);
  const timelineRef = {
    left: useRef(),
    right: useRef(),
    roller: useRef(),
    timeline: useRef(),
    fill: useRef(),
  };
  const ButtonsRef = {
    play: useRef(),
    first: useRef(),
    forward: useRef(),
    backward: useRef(),
    volumeUp: useRef({
      click: () =>
        dispatch({
          type: "volume",
          up: true,
        }),
    }),
    volumeDown: useRef({
      click: () =>
        dispatch({
          type: "volume",
          down: true,
        }),
    }),
    mute: useRef({
      click: () =>
        dispatch({
          type: "volume",
          mute: true,
        }),
    }),
    share: useRef(),
    download: useRef(),
    info: useRef(),
  };

  const StrokeClass = "stroke-rose-900";
  const VolumeComponents = [MuteSvg, Volume1Svg, Volume2Svg, Volume3Svg];
  const Shortcuts = {
    p: ButtonsRef.play,
    0: ButtonsRef.first,
    arrowright: ButtonsRef.forward,
    arrowleft: ButtonsRef.backward,
    "]": ButtonsRef.volumeUp,
    "[": ButtonsRef.volumeDown,
    m: ButtonsRef.mute,
    "shift+s": ButtonsRef.share,
    "shift+d": ButtonsRef.download,
    "shift+i": ButtonsRef.info,
  };

  const [state, dispatch] = useReducer(PlayerReducer(audio), {
    CanPlay: false,
    isPlay: false,
    time: 0,
    inPlay: false,
    volume: +localStorage.getItem("volume") || 3,
  });

  const [mousedown, setMouse] = useState(false);
  const [VolumeComponent, setVolumeComp] = useState(
    () => VolumeComponents[state.volume || 3]
  );

  const SeekToPoint = (point) => {
    if (point === "start") {
      point = 0;
    }

    const time =
      (point * audio.current.duration) /
      timelineRef.timeline.current.getBoundingClientRect().width;

    if (time >= 0 && time <= audio.current.duration) {
      dispatch({
        type: "SetTime",
        time: time,
      });
    }
  };

  useEffect(() => {
    document.querySelectorAll("path.stroke").forEach((el) => {
      el.classList.replace("stroke", StrokeClass);
    });

    if (first.current) {
      document.body.appendChild(audio.current);

      audio.current.currentTime = localStorage.getItem(music.id) || 0;

      timelineRef.timeline.current.addEventListener("click", (event) => {
        const point =
          event.clientX - timelineRef.left.current.getBoundingClientRect().left;
        SeekToPoint(point);
      });

      timelineRef.roller.current.addEventListener("mousedown", () => {
        dispatch({
          type: "pause",
          inPlay: true,
        });

        setMouse(true);
      });

      Object.keys(Shortcuts).forEach((shortcut) => {
        const element = Shortcuts[shortcut].current;

        element.title = shortcut.replace("+", " + ").replace("NULL", "Space");
      });

      assignShortcuts(Shortcuts);

      first.current = false;
    }
  });

  useMemo(() => {
    if (state.CanPlay) {
      if (state.isPlay) {
        audio.current.play();
      } else {
        audio.current.pause();
      }
    }
  }, [state.isPlay, state.CanPlay]);

  useMemo(() => {
    if (!first.current) {
      localStorage.setItem(music.id, state.time);
      timelineRef.fill.current.style.width =
        (state.time / audio.current.duration) * 100 + "%";
    }
  }, [state.time]);

  useMemo(() => {
    if (mousedown) {
      document.body.classList.add("select-none");

      window.onmouseup = (event) => {
        const point =
          event.clientX - timelineRef.left.current.getBoundingClientRect().left;

        window.onmouseup = null;
        window.onmousemove = null;
        setMouse(false);
        SeekToPoint(point);
      };

      window.onmousemove = (event) => {
        const point =
          event.clientX - timelineRef.left.current.getBoundingClientRect().left;

        SeekToPoint(point);
      };
    } else {
      document.body.classList.remove("select-none");

      if (state.inPlay) {
        dispatch({
          type: "play",
        });
      }
    }
  }, [mousedown]);

  useMemo(() => {
    localStorage.setItem("volume", state.volume);
    setVolumeComp(() => VolumeComponents[state.volume]);

    switch (state.volume) {
      case 0:
        audio.current.volume = 0;
        break;

      case 1:
        audio.current.volume = 0.25;
        break;

      case 2:
        audio.current.volume = 0.75;
        break;

      case 3:
        audio.current.volume = 1;
        break;
    }
  }, [state.volume]);

  audio.current.addEventListener("canplaythrough", () => {
    dispatch({
      type: "SetPermission",
    });
  });

  audio.current.addEventListener("timeupdate", () => {
    dispatch({
      type: "SetTime",
      timeupdate: true,
      time: audio.current.currentTime,
    });
  });

  return (
    <section className="max-w-full min-h-1/2 bg-rose-50 rounded-3xl p-4 flex justify-between items-center flex-row flex-wrap relative">
      <img
        className={`w-1/2 lg:w-1/3 rounded-3xl ${
          (state.isPlay || state.inPlay) && "animate-wiggle"
        }`}
        src={music.cover}
        alt={music.name}
      />

      <div className="w-1/2 h-1/2 pr-4 text-center">
        <h2 className="text-3xl sm:text-6xl xl:text-8xl">{music.name}</h2>
        <h3 className="mt-2 text-xl sm:text-3xl xl:text-5xl">{music.singer}</h3>
        {music.album && (
          <h4 className="mt-2 text-sm sm:text-base xl:text-xl">
            البوم: {music.album}
          </h4>
        )}
      </div>

      <div className="w-1/4 h-auto absolute top-0 right-0  flex justify-between p-4">
        <button
          title="m"
          onClick={() =>
            dispatch({
              type: "volume",
              loop: true,
            })
          }
        >
          <VolumeComponent className="icon small fill-rose-900" />
        </button>

        <button ref={ButtonsRef.share} onClick={() => share(music)}>
          <ShareSvg className="icon small stroke-rose-900 fill-rose-900" />
        </button>

        <a
          ref={ButtonsRef.download}
          href={music.path}
          download={music.id}
          className="cursor-pointer"
        >
          <DownloadSvg className="icon small stroke-rose-900" />
        </a>

        <Link ref={ButtonsRef.info} to="info" className="cursor-pointer">
          <InfoSvg className="icon small fill-rose-900" />
        </Link>
      </div>

      <div className="col-span-3 w-full mt-6">
        <div
          ref={timelineRef.timeline}
          className="h-1 hover:h-2 bg-rose-200 rounded-xl relative timeline mb-2"
        >
          <span ref={timelineRef.left} className="float-left"></span>
          <span
            ref={timelineRef.fill}
            className="h-full bg-rose-400 block absolute left-0 rounded-xl timeline-fill"
          >
            <span
              ref={timelineRef.roller}
              className={
                "w-4 h-4 bg-rose-900 rounded-full absolute -top-1 cursor-pointer timeline-roller " +
                (state.time === 0 && "hidden")
              }
            ></span>
          </span>
          <span ref={timelineRef.right} className="float-right"></span>
        </div>

        <span
          ref={ButtonsRef.first}
          className="float-left font-light text-sm md:text-lg lg:text-lg xl:text-2xl"
          onClick={() => SeekToPoint("start")}
        >
          {formatTime(state.time)}
        </span>
        <span className="float-right font-light text-sm md:text-lg lg:text-lg xl:text-2xl">
          {formatTime(audio.current.duration)}
        </span>

        <div className="flex justify-center my-5 relative">
          <button
            ref={ButtonsRef.forward}
            className="w-7 sm:w-10 lg:w-16"
            onClick={() =>
              dispatch({
                type: "forward",
              })
            }
          >
            <TsRSvg className="icon fill-rose-900" />
          </button>

          <button
            ref={ButtonsRef.play}
            className="mx-4 w-7 sm:w-10 lg:w-16"
            onClick={() =>
              dispatch({
                type: !state.isPlay ? "play" : "pause",
              })
            }
          >
            {!state.isPlay ? (
              <PlaySvg className={"icon fill-rose-900 " + StrokeClass} />
            ) : (
              <PauseSvg className={"icon stroke-[7] " + StrokeClass} />
            )}
          </button>

          <button
            ref={ButtonsRef.backward}
            onClick={() =>
              dispatch({
                type: "backward",
              })
            }
            className="w-7 sm:w-10 lg:w-16"
          >
            <TsLSvg className="icon fill-rose-900" />
          </button>
        </div>
      </div>
    </section>
  );
}
