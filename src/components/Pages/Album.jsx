import { json, useLoaderData } from "react-router";
import albums from "../../assets/config/albums.json";
import Musics, { AllMusicsLoader } from "./AllMusics";

export function AlbumLoader({ params }) {
  const albumName = params.album;
  const album = albums.find((album) => album.id === albumName);
  album.cover = new URL(
    `/src/assets/images/albums/${album.id}.jpg`,
    import.meta.url
  ).href;

  if (album) {
    return json(album, 200);
  } else {
    throw Response("Can not find album", {
      status: 404,
      statusText: "Not Found",
    });
  }
}

export default function Album() {
  const album = useLoaderData();

  return (
    <div className="text-rose-700 pb-24">
      <section className="flex flex-wrap mb-4 bg-rose-50 p-4 rounded-xl">
        <img
          className="w-full sm:w-1/4 max-md:flex-1 rounded-3xl inline-block border-2 border-rose-700"
          src={album.cover}
          alt={album.id}
        />

        <div className="w-full sm:w-1/2 max-sm:mt-4 max-sm:pb-2 pr-4 font-semibold bg-rose-100 bg-opacity-60 sm:mx-4 rounded-xl">
          <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl my-2">
            البوم {album.name}
          </h2>
          {album.year && <h4 className="mr-4 ">سال پخش: {album.year}</h4>}
          <h3 className="mr-4 ">خواننده: {album.singer}</h3>
          {album.producer && (
            <h5 className="mr-4 ">اهنگساز: {album.producer}</h5>
          )}
          {album.designer && (
            <h5 className="mr-4 ">طراح کاور: {album.designer}</h5>
          )}
        </div>
      </section>
      {album.InProgress === "both" ? (
        <>
          <h3 className="animate-pulse w-full bg-rose-50 p-4 font-bold text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl rounded-xl my-4">
            در حال پخش...
          </h3>
          <h3 className="w-full bg-rose-50 p-4 font-bold text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl rounded-xl my-4">
            ترک ها:
          </h3>
          <Musics data={AllMusicsLoader({ params: { album: album.name } })} />
        </>
      ) : album.InProgress ? (
        <h3 className="w-full bg-rose-50 p-4 font-bold text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl rounded-xl my-4">
          در حال ساخت...
        </h3>
      ) : (
        <>
          <h3 className="w-full bg-rose-50 p-4 font-bold text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl rounded-xl my-4">
            ترک ها:
          </h3>

          <Musics data={AllMusicsLoader({ params: { album: album.name } })} />
        </>
      )}
    </div>
  );
}
