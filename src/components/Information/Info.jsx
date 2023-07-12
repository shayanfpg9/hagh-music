import { useContext } from "react";
import MusicContext from "../../contexts/Music";
import { Link } from "react-router-dom";

export default function Info() {
  const music = useContext(MusicContext);

  return (
    <>
      <section className="flex">
        <img
          className="w-1/2 sm:w-1/4 rounded-3xl inline-block"
          src={music.cover}
          alt={music.id}
        />

        <div className="w-1/2 pr-4">
          <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl my-2">
            {music.name}
          </h2>
          <h3 className="mr-4 ">خواننده: {music.singer}</h3>
          {music.year && <h4 className="mr-4 ">سال پخش: {music.year}</h4>}
          {music.album && <h4 className="mr-4 ">البوم: {music.album}</h4>}
          {music.producer && (
            <h5 className="mr-4 ">اهنگساز: {music.producer}</h5>
          )}
          {music.designer && (
            <h5 className="mr-4 ">طراح کاور: {music.designer}</h5>
          )}
        </div>
      </section>

      <br />
      <br />

      <Link
        to="play"
        className="w-3/4 h-20 bg-rose-200 p-4 rounded-xl absolute left-1/2 -translate-x-1/2 flex justify-center items-center hover:shadow-lg hover:shadow-rose-300 hover:-translate-y-2"
      >
        شنیدن اهنگ
      </Link>

      <br />
      <br />
      <br />
      <p className="mr-6 pb-[6rem] to-rose-500">
        {music.lyrics.split("\n").map((part, i) => (
          <span key={i}>
            {part}
            <br />
          </span>
        ))}
      </p>
    </>
  );
}
