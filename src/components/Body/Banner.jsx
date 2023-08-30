import { useEffect, useMemo, useRef, useState } from "react";
import banner from "../../assets/config/banner.json";
import { Link } from "react-router-dom";

export default function Banner() {
  const [isOpen, setState] = useState(
    String(localStorage.getItem("banner")) !== banner.id
  );
  const first = useRef(true);

  useMemo(() => {
    document.body.classList[isOpen ? "add" : "remove"]("overflow-hidden");

    if (!isOpen) {
      localStorage.setItem("banner", banner.id);
    }
  }, [isOpen]);

  useEffect(() => {
    if (first.current) {
      first.current = false;

      document.body.classList[isOpen ? "add" : "remove"]("overflow-hidden");
    }
  });

  return (
    isOpen && (
      <>
        <div className="w-full h-[200vh] bg-gray-200 bg-opacity-60 absolute backdrop-blur-lg z-10"></div>

        <section className="h-[95%] w-[95%] sm:w-3/4 bg-rose-300 bg-opacity-60 rounded-[2rem] sm:rounded-l-[3rem] fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 shadow-rose-300 flex justify-center items-baseline flex-col z-20 text-4xl xl:text-5xl font-semibold text-rose-900 text-center">
          <img
            src={
              new URL(
                `/src/assets/images/banners/${banner.id}.jpg`,
                import.meta.url
              ).href
            }
            alt="the banner"
            className="w-60 lg:w-60 rounded-full mb-8 mt-4 relative left-1/2 -translate-x-1/2 shadow-lg shadow-rose-300"
          />
          <div className="flex flex-col w-full">
            <h1 className="mb-4">{banner.name}</h1>
            <p className="text-2xl xl:text-3xl">{banner.short}</p>
          </div>
          <div className="flex flex-col justify-center items-center mb-8 w-full">
            <Link
              className="bg-rose-50 w-[95%] p-8 rounded-xl my-4"
              onClick={() => setState(false)}
              to={banner.to}
            >
              {banner.button}
            </Link>
            <button
              onClick={() => setState(false)}
              className="bg-rose-50 w-[95%] p-8 rounded-xl my-4"
              type="button"
            >
              بستن
            </button>
            {banner.time && (
              <h2 className="text-2xl xl:text-3xl mt-8">در {banner.time}</h2>
            )}
          </div>
        </section>
      </>
    )
  );
}
