// React:
import { useContext } from "react";

// Assets:
import logo from "/logo.jpg";
import { ReactComponent as MenuSvg } from "../../assets/images/menu.svg";

// Contexts:
import MenuContext from "../../contexts/Menu";
import { Link } from "react-router-dom";

export default function Header() {
  const [isOpen, setState] = useContext(MenuContext);

  return (
    <header className="absolute w-11/12 h-1/6 bg-rose-100 left-1/2 -translate-x-1/2 mt-6 rounded-full flex justify-center items-center shadow-lg shadow-rose-200">
      <h1
        title="حق ادب"
        className="text-4xl text-rose-900 font-medium sm:text-6xl lg:text-7xl 2xl:text-8xl"
      >
        <Link to="/">حق ادب</Link>
      </h1>
      <Link
        title="لوگو"
        className="absolute left-2 top-1/2 -translate-y-1/2 w-24 sm:w-28 lg:w-30 2xl:w-48"
        to="/"
      >
        <img
          className="rounded-full hover:shadow-rose-200 hover:shadow-lg"
          src={logo}
          alt="حق ادب"
        />
      </Link>
      <span
        onClick={() => setState(true)}
        className={
          "w-14 sm:w-20 lg:w-24 2xl:w-32 cursor-pointer absolute right-4 " +
          (isOpen && "hidden")
        }
      >
        {<MenuSvg className="icon stroke-rose-900" />}
      </span>
    </header>
  );
}
