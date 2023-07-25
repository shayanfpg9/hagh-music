import { useContext } from "react";
import MusicContext from "../../contexts/Music";
import { Link } from "react-router-dom";

export default function Info() {
  const music = useContext(MusicContext);

  return (
    <>
      <section className="flex flex-wrap mb-20">
        <img
          className="w-full sm:w-1/4 rounded-3xl inline-block"
          src={music.cover}
          alt={music.id}
        />

        <div className="w-full sm:w-1/2 pr-4 flex-1 flex flex-wrap">
          <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl my-2 w-full">
            {music.name}
          </h2>
          <h3 className="mr-4 w-full">خواننده: {music.singer}</h3>
          {music.year && (
            <h4 className="mr-4 w-full sm:w-[40%]">سال پخش: {music.year}</h4>
          )}
          {music.album && (
            <h4 className="py-1 w-full max-sm:mr-4 sm:w-1/2">
              البوم:
              <Link
                to={music?.albumLink && "/album/" + music.albumLink}
                className="mr-1 px-1 rounded-xl bg-rose-50"
              >
                {music.album}
              </Link>
            </h4>
          )}
          {music.producer && (
            <h5 className="mr-4 w-full">اهنگساز: {music.producer}</h5>
          )}
          {music.mix && (
            <h5 className="mr-4 w-full">میکس و مستر: {music.mix}</h5>
          )}
          {music.designer && (
            <h5 className="mr-4 w-full">طراح کاور: {music.designer}</h5>
          )}
        </div>
      </section>

      <Link
        to="play"
        className="w-3/4 h-20 bg-rose-200 p-4 rounded-xl absolute left-1/2 -translate-x-1/2 flex justify-center items-center hover:shadow-lg hover:shadow-rose-300 hover:-translate-y-2"
      >
        شنیدن اهنگ
      </Link>

      <br />
      <br />
      <p className="mr-6 pb-[6rem] mt-20">
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
