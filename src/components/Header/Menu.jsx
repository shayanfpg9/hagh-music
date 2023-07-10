// React:
import { useContext } from "react";

// Contexts:
import MenuContext from "../../contexts/Menu";

// Assets:
import { ReactComponent as CLoseSvg } from "../../assets/images/close.svg";
import RubikaImage from "../../assets/images/rubika.png";
import GithubImage from "../../assets/images/github.png";

export default function Menu() {
  const [isOpen, setState] = useContext(MenuContext);
  const menuItems = {
    large: [
      {
        name: "خانه",
        path: "/",
        internal: true,
      },
      {
        name: "اشنایی با تیم",
        path: "/team",
        internal: true,
      },
      {
        name: "موزیک ها",
        path: "/musics",
        internal: true,
      },
      {
        name: "دونیت",
        path: "https://idpay.ir/hagh-music",
      },
    ],

    small: [
      {
        title: "ما در روبیکا",
        image: RubikaImage,
        path: "https://rubika.ir/joinc/CCAGEBAH0REBQSUBDDMEQBBHGNKIAWZY",
        small: true,
      },
      {
        title: "طراح سایت",
        image: GithubImage,
        path: "https://github.com/shayanfpg9",
        small: true,
      },
    ],
  };

  return (
    <>
      <div
        className={
          "duration-300 " +
          (isOpen &&
            "w-full h-full bg-rose-100 bg-opacity-60 absolute backdrop-blur-lg")
        }
      ></div>
      <section
        className={
          "h-[95%] w-[95%] sm:w-2/4 bg-rose-200 bg-opacity-60 rounded-l-[2rem] sm:rounded-l-[3rem] fixed top-1/2 -translate-y-1/2  shadow-rose-200 duration-300 flex justify-center items-center " +
          (!isOpen
            ? "translate-x-full opacity-0"
            : "translate-x-0 shadow-[1rem_0px_5rem_0px]")
        }
      >
        <menu className="flex justify-center items-center flex-wrap h-1/2 px-[2rem]">
          {...menuItems.large.map((item, i) => (
            <li key={"menu-item-large-" + i} className="w-full">
              <a
                href={item.path}
                {...(!item.internal ? { target: "_blank" } : {})}
                title={item.title || item.name}
              >
                <h3 className="text-4xl lg:text-5xl xl:text-5xl font-semibold text-rose-900 before:content-['>'] before:ml-2 hover:before:mr-4 hover:underline hover:decoration-rose-900">
                  {item.name}
                </h3>
              </a>
            </li>
          ))}

          <li className="w-2/3 flex justify-between items-center">
            {...menuItems.small.map((item, i) => (
              <a
                key={"menu-item-small-" + i}
                className="w-1/3 sm:w-2/4 lg:w-2/6 2xl:w-3/12 mx-1"
                href={item.path}
                {...(!item.internal ? { target: "_blank" } : {})}
                title={item.title || item.image}
              >
                <img
                  src={item.image}
                  alt={item.title || item.image}
                  className="bg-white rounded-3xl hover:shadow-lg shadow-rose-700"
                />
              </a>
            ))}
          </li>
        </menu>

        <span
          onClick={() => setState(false)}
          className={
            "w-14 sm:w-20 lg:w-24 2xl:w-32 cursor-pointer absolute left-4 top-4 " +
            (!isOpen && "hidden")
          }
        >
          <CLoseSvg className="menu stroke-rose-900" />
        </span>
      </section>
    </>
  );
}
