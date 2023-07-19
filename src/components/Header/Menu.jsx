// React:
import { useContext, useMemo } from "react";

// Contexts:
import MenuContext from "../../contexts/Menu";

// Assets:
import { ReactComponent as CLoseSvg } from "../../assets/images/close.svg";
import GithubImage from "../../assets/images/social/github.png";
import { Link } from "react-router-dom";
import { social, menu as large } from "../../assets/config/config.json";

export default function Menu() {
  const [isOpen, setState] = useContext(MenuContext);
  const menuItems = {
    large,

    small: [
      ...social.map(
        (prop) =>
          (prop.icon = new URL(
            `../../assets/images/social/${prop.name}.png`,
            import.meta.url
          ).href) && prop
      ),
      {
        title: "طراح سایت",
        icon: GithubImage,
        path: "https://github.com/shayanfpg9",
      },
    ],
  };
  const ItemClick = () => {
    setState(false);
  };

  useMemo(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  return (
    <>
      <div
        className={
          "duration-30 " +
          (isOpen &&
            `w-full h-[200vh] bg-rose-100 bg-opacity-60 absolute backdrop-blur-lg`)
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
            <li
              onClick={ItemClick}
              key={"menu-item-large-" + i}
              className="w-full py-4"
            >
              <Link
                to={item.path}
                {...(!item.internal ? { target: "_blank" } : {})}
                title={item.title || item.name}
              >
                <h3 className="text-4xl lg:text-4xl xl:text-5xl font-semibold text-rose-900 before:content-['>'] before:ml-2 hover:before:mr-4 hover:underline hover:decoration-rose-900">
                  {item.name}
                </h3>
              </Link>
            </li>
          ))}

          <li className="w-2/3 flex justify-between items-center my-8">
            {...menuItems.small.map((item, i) => (
              <Link
                onClick={ItemClick}
                key={"menu-item-small-" + i}
                className="w-1/3 sm:w-2/4 lg:w-2/6 2xl:w-3/12 mx-1"
                to={item.path}
                {...(!item.internal ? { target: "_blank" } : {})}
                title={item.title || item.image}
              >
                <img
                  src={item.icon}
                  alt={item.title || item.icon}
                  className="bg-white rounded-3xl hover:shadow-lg shadow-rose-700"
                />
              </Link>
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
          <CLoseSvg className="icon stroke-rose-900" />
        </span>
      </section>
    </>
  );
}
