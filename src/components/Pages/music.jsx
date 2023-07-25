import { Outlet, json, useLoaderData } from "react-router-dom";
import musics from "../../assets/config/musics.json";
import albums from "../../assets/config/albums.json";
import axios from "axios";
import MusicContext from "../../contexts/Music";

export async function MusicLoader({ params }) {
  const music = musics.find((v) => v.id === params.id);
  const Url = (fileName) =>
    new URL(`../../${music.root}/${fileName}`, import.meta.url).href;
  const Import = async (fileName) => (await axios.get(Url(fileName))).data;

  music.cover = Url("cover.jpg");
  music.path = Url("song.mp3");
  music.lyrics = await Import("lyrics.txt");

  if (music.album) {
    music.albumLink = albums.find((album) => album.name === music.album)?.id;
  }

  if (music) {
    return json(music, 200);
  } else {
    throw Response("Can not find music", {
      status: 404,
      statusText: "Not Found",
    });
  }
}

export default function Music() {
  const music = useLoaderData();

  return (
    <section className="text-lg sm:text-xl lg:text-2xl 2xl:text-3xl text-rose-900 font-medium">
      <MusicContext.Provider value={music}>
        <Outlet />
      </MusicContext.Provider>
    </section>
  );
}
