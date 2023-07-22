import { json, useLoaderData, useNavigate } from "react-router-dom";
import MusicsJson from "../../assets/config/musics.json";
import PropTypes from "prop-types";

export function AllMusicsLoader({ params }) {
  let filterd = MusicsJson;
  if (params?.album) {
    filterd = MusicsJson.filter((v) => v.album === params.album);
  }

  const musics = filterd.map((obj) => {
    return {
      id: obj.id,
      name: obj.name,
      singer: obj.singer,
      cover: new URL(`../../${obj.root}/cover.jpg`, import.meta.url).href,
      year: obj.year,
      keywords: obj.keywords,
      description:
        obj.description.length > 50
          ? obj.description.slice(0, 50) + "..."
          : obj.description,
    };
  });

  if (!params.album) {
    return json(musics, 200);
  } else {
    return musics;
  }
}

export default function Musics({ data }) {
  // eslint-disable-next-line
  const musics = data || useLoaderData();
  const navigate = useNavigate();

  return (
    <section className="mb-28">
      {...musics.map((music, i) => (
        <section
          key={`music-${i}`}
          className="cursor-pointer w-full h-1/3 bg-rose-50 rounded-3xl p-4 flex flex-wrap max-sm:justify-center mb-4"
          onClick={() => navigate(`/music/${music.id}`)}
        >
          <img
            className="w-3/4 sm:w-1/3 xl:w-1/4 rounded-3xl"
            src={music.cover}
            alt={music.id}
          />

          <div className="max-sm:mt-4 max-sm:w-full text-rose-800 font-bold h-1/2 flex flex-wrap sm:pr-6 w-2/3">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-6xl">{music.name}</h2>
              <h3 className="mt-2 mr-3 text-xl sm:text-xl lg:text-3xl">
                {music.singer}
              </h3>
              <p className="mt-2 text-rose-500 text-sm sm:text-base lg:text-lg xl:text-xl">
                {music.description}
              </p>
            </div>

            <button className="w-full mt-5 bg-rose-100 text-2xl p-4 rounded-2xl">
              اطلاعات بیشتر...
            </button>
          </div>
        </section>
      ))}
    </section>
  );
}

Musics.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      singer: PropTypes.string.isRequired,
      cover: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
      keywords: PropTypes.arrayOf(PropTypes.string),
      description: PropTypes.string.isRequired,
    })
  ),
};
