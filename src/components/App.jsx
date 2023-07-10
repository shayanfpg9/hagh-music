// React:
import { useState } from "react";

// Components:
import Header from "./Header/Header";
import Menu from "./Header/Menu";
import Footer from "./Footer/Footer";
import Body from "./Body/Body";

// Contexts:
import MenuContext from "../contexts/Menu";
import { Outlet } from "react-router-dom";

export default function App(props) {
  const [isOpen, setMenuStatus] = useState(false);

  return (
    <>
      <MenuContext.Provider value={[isOpen, setMenuStatus]}>
        <Header />
        <Menu />
        <Body>{props.Outlet ? <props.Outlet /> : <Outlet />}</Body>
        <Footer />
      </MenuContext.Provider>
    </>
  );
}
