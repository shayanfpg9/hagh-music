import { useEffect, useRef, useState } from "react";
import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorElement(props) {
  const [error, setError] = useState(props);
  const RouterError = useRouteError();
  const first = useRef(true);

  useEffect(() => {
    if (isRouteErrorResponse(RouterError) && first.current) {
      setError({
        msg: RouterError.statusText,
        status: RouterError.status,
        for: RouterError.data.replace("Error:", ""),
      });

      first.current = false;
    }
  });

  return (
    <section className="h-[90%] w-1/2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center flex-col text-center bg-rose-200 bg-opacity-60 shadow-lg shadow-rose-200 rounded-3xl text-rose-600 text-2xl lg:text-3xl 2xl:text-4xl">
      <h2 className="w-full text-3xl lg:text-4xl 2xl:text-5xl font-medium">
        ارور: {error.status || 500}
      </h2>
      <span className="w-full text-xl lg:text-2xl 2xl:text-3xl">
        {error.msg}
      </span>
      <br />
      {error.for && (
        <>
          <details className="w-[95%] rounded-2xl marker:content-[''] cursor-help bg-rose-100 p-4">
            <summary>چرا این خطا رخ داد:</summary>
            <p style={{ direction: "ltr" }}>{error.for}</p>
          </details>
          <br />
        </>
      )}
      <Link
        className="w-[95%] bg-rose-300 p-4 rounded-3xl hover:-translate-y-2 hover:shadow-lg hover:shadow-rose-200 bg-opacity-30"
        to={error.link || "/"}
      >
        {error.help || "بازگشت به خانه"}
      </Link>
    </section>
  );
}
