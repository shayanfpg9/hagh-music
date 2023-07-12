// React:
import { useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import useConfig from "../Hooks/useConfig";

// Components:
import Header from "./Header/Header";
import Menu from "./Header/Menu";
import Footer from "./Footer/Footer";
import Body from "./Body/Body";

// Contexts:
import MenuContext from "../contexts/Menu";

export default function App(props) {
  const location = useLocation();
  const [isOpen, setMenuStatus] = useState(false);

  
  useConfig();

  useMemo(() => {
    if (
      !location.pathname.endsWith("/play") &&
      document.getElementsByTagName("audio")[0]
    ) {
      document.body.removeChild(document.body.getElementsByTagName("audio")[0]);
    }
  }, [location]);

  return (
    <>
      <MenuContext.Provider value={[isOpen, setMenuStatus]}>
        <Header />
        <Menu />
      </MenuContext.Provider>
      <Body>{props.Outlet ? <props.Outlet /> : <Outlet />}</Body>
      <Footer />
    </>
  );
}
