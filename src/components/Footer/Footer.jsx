import { Link } from "react-router-dom";
import { version } from "../../assets/config/config.json";

export default function Footer() {
  return (
    <footer className="w-[95%] max-h-[8rem] fixed bottom-4 bg-rose-100 left-1/2 -translate-x-1/2 p-4 rounded-3xl text-center text-rose-900 font-medium -z-10 sm:text-xl lg:text-2xl shadow-lg shadow-rose-300">
      ({version}) copyright &#169; {new Date().getFullYear()}
      <br />
      Designed by{" "}
      <Link
        className="underline text-rose-950"
        to="https://github.com/shayanfpg9"
        target="_blank"
      >
        @shayanfpg9
      </Link>{" "}
      for Hagh music
    </footer>
  );
}
