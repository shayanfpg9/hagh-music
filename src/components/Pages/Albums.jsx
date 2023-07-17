import { json, useLoaderData, useNavigate } from "react-router-dom";
import AlbumsJson from "../../assets/config/albums.json";

export function AllAlbumsLoader() {
  const albums = AlbumsJson.reverse().map((obj) => ({
    id: obj.id,
    name: obj.name,
    singer: obj.singer,
    cover: new URL(`/src/assets/images/albums/${obj.id}.jpg`, import.meta.url)
      .href,
    year: obj.year,
    keywords: obj.keywords,
  }));

  return json(albums, 200);
}

export default function Albums() {
  const albums = useLoaderData();
  const navigate = useNavigate();

  return (
    <section className="mb-28">
      {...albums.map((album) => (
        <section
          className="cursor-pointer w-full h-1/3 bg-rose-50 rounded-3xl p-4 flex flex-wrap max-sm:justify-center mb-4"
          onClick={() => navigate(`/album/${album.id}`)}
        >
          <img
            className="w-3/4 sm:w-1/3 xl:w-1/4 rounded-3xl"
            src={album.cover}
            alt={album.id}
          />

          <div className="max-sm:mt-4 max-sm:w-full text-rose-800 font-bold h-1/2 flex flex-wrap sm:pr-6 w-2/3">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-6xl">{album.name}</h2>

              {album.year && (
                <h4 className="mt-2 mr-3 text-xl sm:text-xl lg:text-3xl">
                  سال پخش: {album.year}
                </h4>
              )}
              <h3 className="mt-2 mr-3 text-xl sm:text-xl lg:text-3xl">
                خواننده: {album.singer}
              </h3>
              {album.producer && (
                <h5 className="mt-2 mr-3 text-xl sm:text-xl lg:text-3xl">
                  اهنگساز: {album.producer}
                </h5>
              )}
              {album.designer && (
                <h5 className="mt-2 mr-3 text-xl sm:text-xl lg:text-3xl">
                  طراح کاور: {album.designer}
                </h5>
              )}
            </div>

            <button className="w-full mt-5 bg-rose-100 text-2xl p-4 rounded-2xl">
              درباره ی این البوم...
            </button>
          </div>
        </section>
      ))}
    </section>
  );
}
