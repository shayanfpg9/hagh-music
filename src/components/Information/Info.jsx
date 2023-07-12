import { useContext } from "react";
import MusicContext from "../../contexts/Music";
import { Link } from "react-router-dom";

export default function Info() {
  const music = useContext(MusicContext);

  return (
    <>
      <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl my-2">
        {music.name}
      </h2>
      <h3 className="mr-4 ">خواننده: {music.singer}</h3>
      <h4 className="mr-4 ">سال پخش: {music.year}</h4>
      {music.album && <h4 className="mr-4 ">البوم: {music.album}</h4>}
      <h5 className="mr-4 ">اهنگساز: {music.producer}</h5>
      <h5 className="mr-4 ">طراح کاور: {music.designer}</h5>
      <br />
      <br />

      <Link
        to="../"
        className="w-3/4 h-20 bg-rose-200 p-4 rounded-xl absolute left-1/2 -translate-x-1/2 flex justify-center items-center hover:shadow-lg hover:shadow-rose-300 hover:-translate-y-2"
      >
        شنیدن اهنگ
      </Link>

      <br />
      <br />
      <br />
      <br />
      <h5 className="mr-4 font-bold">متن:</h5>
      <p className="mr-6 pb-[6rem]">
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
